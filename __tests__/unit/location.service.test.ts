import { getAll, getById, remove, update, create } from '../../src/location/location.service';
import db from '../../src/Drizzle/db';
import { LocationTable } from '../../src/Drizzle/schema';
import { eq } from 'drizzle-orm';

jest.mock('../../src/Drizzle/db', () => {
  // Define mockLocationTable directly inside the mock factory
  const mockLocationTable = {
    findMany: jest.fn(),
    findFirst: jest.fn(),
  };

  return {
    insert: jest.fn(() => ({
      values: jest.fn().mockReturnThis(),
      returning: jest.fn(),
    })),
    update: jest.fn(() => ({
      set: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      returning: jest.fn(),
    })),
    delete: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      returning: jest.fn(),
    })),
    query: {
      LocationTable: mockLocationTable,
    },
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Location Service', () => {
  describe('createLocationService', () => {
    it('should insert a Location and return the inserted Location', async () => {
      const locationToInsert = {
        address: '123 Main St',
        locationName: 'Test Location',
        contactNumber: '123-456-7890',
      };
      const insertedResult = { ...locationToInsert, locationID: 1 };

      (db.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValueOnce([insertedResult]),
      });

      const result = await create(locationToInsert);

      expect(db.insert).toHaveBeenCalledWith(LocationTable);
      expect(result).toEqual(insertedResult);
    });

    it('should return null if insertion fails', async () => {
      (db.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValueOnce([null]),
      });

      const locationToInsert = {
        address: '456 Elm St',
        locationName: 'Another Location',
        contactNumber: '987-654-3210',
      };

      const result = await create(locationToInsert);
      expect(result).toBeNull();
    });
  });

  describe('getLocationService', () => {
    it('should return all Location', async () => {
      const locations = [
        { locationID: 1, locationName: 'Location 1', address: 'Address 1', contactNumber: '111-222-3333' },
        { locationID: 2, locationName: 'Location 2', address: 'Address 2', contactNumber: '444-555-6666' },
      ];
      // Access the mock directly via db.query.LocationTable
      (db.query.LocationTable.findMany as jest.Mock).mockResolvedValueOnce(locations);

      const result = await getAll();
      expect(result).toEqual(locations);
    });

    it('should return empty array if no Location', async () => {
      // Access the mock directly via db.query.LocationTable
      (db.query.LocationTable.findMany as jest.Mock).mockResolvedValueOnce([]);
      const result = await getAll();
      expect(result).toEqual([]);
    });
  });

  describe('getLocationByIdService', () => {
    it('should return a location if found', async () => {
      const location = {
        locationID: 1,
        locationName: 'Specific Location',
        address: '100 Main St',
        contactNumber: '555-123-4567',
      };
      // Access the mock directly via db.query.LocationTable
      (db.query.LocationTable.findFirst as jest.Mock).mockResolvedValueOnce(location);

      const result = await getById(1);
      expect(db.query.LocationTable.findFirst).toHaveBeenCalledWith({
        where: eq(LocationTable.locationID, 1),
      });
      expect(result).toEqual(location);
    });

    it('should return undefined if not found', async () => {
      // Access the mock directly via db.query.LocationTable
      (db.query.LocationTable.findFirst as jest.Mock).mockResolvedValueOnce(undefined);
      const result = await getById(9999);
      expect(result).toBeUndefined();
    });
  });

  describe('updateLocationService', () => {
    it('should update a Location and return success message', async () => {
      (db.update as jest.Mock).mockReturnValue({
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockResolvedValueOnce(undefined),
      });

      const updatedLocationData = {
        locationName: 'Updated Name',
        address: 'Updated Address',
        contactNumber: '999-888-7777',
      };

      const result = await update(1, updatedLocationData);

      expect(db.update).toHaveBeenCalledWith(LocationTable);
      expect(result).toBe('Location updated successfully');
    });
  });

  describe('deleteLocationService', () => {
    it('should delete a location and return success message', async () => {
      (db.delete as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValueOnce([{ locationID: 1 }]),
      });

      const result = await remove(1);
      expect(db.delete).toHaveBeenCalledWith(LocationTable);
      expect(result).toBe('Location deleted successfully');
    });
  });
});
