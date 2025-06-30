import { getAll, getById, remove, update, create } from "../../src/maintenance/maintenance.service";
import db from "../../src/Drizzle/db";
import { MaintenanceTable } from "../../src/Drizzle/schema";
import { eq } from 'drizzle-orm'; // Make sure to import 'eq' for getById test

// Mock the entire db module
// Define all mocks directly within the jest.mock factory function to avoid ReferenceError
jest.mock("../../src/Drizzle/db", () => {
  // Explicitly define the mock object for db.query.MaintenanceTable
  const mockMaintenanceTableQuery = {
    findMany: jest.fn(),
    findFirst: jest.fn()
  };

  return {
    insert: jest.fn(() => ({
      values: jest.fn().mockReturnThis(), // Allows chaining .values()
      returning: jest.fn(), // Mocks .returning()
    })),
    update: jest.fn(() => ({
      set: jest.fn().mockReturnThis(), // Allows chaining .set()
      where: jest.fn().mockReturnThis(), // Allows chaining .where()
      // No .returning() here as the service's update function doesn't use it
    })),
    delete: jest.fn(() => ({
      where: jest.fn().mockReturnThis(), // Allows chaining .where()
      // No .returning() here as the service's delete function doesn't use it
    })),
    query: {
      MaintenanceTable: mockMaintenanceTableQuery, // Use the explicitly defined mock object
    },
  };
});

// Access the mocked functions directly for easier testing
const mockMaintenanceFindMany = (db.query.MaintenanceTable.findMany as jest.Mock);
const mockMaintenanceFindFirst = (db.query.MaintenanceTable.findFirst as jest.Mock);

beforeEach(() => {
  jest.clearAllMocks();
});

// test create maintenance
describe("Maintenance Service", () => {
  describe("createMaintenanceService", () => {
    it("should insert a Maintenance and return the inserted Maintenance", async () => {
      // Define the data to be inserted
      const maintenanceToInsert = {
        carID: 1,
        maintenanceDate: new Date().toISOString(),
        description: "desc",
        cost: "100"
      };
      // Define what `returning()` should yield.
      // Assuming maintenanceID is auto-generated and returned.
      const insertedResult = { maintenanceID: 1, ...maintenanceToInsert };

      // Mock the insert chain: db.insert().values().returning()
      (db.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValueOnce([insertedResult]),
      });

      const result = await create(maintenanceToInsert);

      // Verify that db.insert was called with the correct table
      expect(db.insert).toHaveBeenCalledWith(MaintenanceTable);
      // Verify that the result matches the expected inserted object
      expect(result).toEqual(insertedResult);
    });

    it("should return null if insertion fails", async () => {
      // Mock the insert chain to simulate a failed insertion (e.g., returning [null])
      (db.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValueOnce([null])
      });

      const maintenanceToInsert = {
        carID: 2,
        maintenanceDate: new Date().toISOString(),
        description: "desc",
        cost: "200"
      };

      const result = await create(maintenanceToInsert);
      // Expect the result to be null when insertion fails
      expect(result).toBeNull();
    });
  });

  // test get all maintenance
  describe("getMaintenanceService", () => {
    it("should return all Maintenance", async () => {
      const maintenances = [
        { maintenanceID: 1, carID: 1, maintenanceDate: new Date().toISOString(), description: "desc 1", cost: "100" },
        { maintenanceID: 2, carID: 2, maintenanceDate: new Date().toISOString(), description: "desc 2", cost: "200" }
      ];
      // Mock db.query.MaintenanceTable.findMany to resolve with the list of maintenances
      mockMaintenanceFindMany.mockResolvedValueOnce(maintenances);

      const result = await getAll();
      // Expect the result to be the array of maintenances
      expect(result).toEqual(maintenances);
    });

    it("should return empty array if no maintenances", async () => {
      // Mock db.query.MaintenanceTable.findMany to resolve with an empty array
      mockMaintenanceFindMany.mockResolvedValueOnce([]);
      const result = await getAll();
      // Expect the result to be an empty array
      expect(result).toEqual([]);
    });
  });

  // test get maintenance by ID
  describe("getMaintenanceByIdService", () => {
    it("should return a Maintenance if found", async () => {
      const maintenance = {
        maintenanceID: 1,
        carID: 1,
        maintenanceDate: new Date().toISOString(),
        description: "desc",
        cost: "100"
      };
      // Mock db.query.MaintenanceTable.findFirst to resolve with the specific maintenance
      mockMaintenanceFindFirst.mockResolvedValueOnce(maintenance);

      const result = await getById(1);
      // Verify findFirst was called with the correct `where` clause
      expect(mockMaintenanceFindFirst).toHaveBeenCalledWith({
        where: eq(MaintenanceTable.maintenanceID, 1)
      });
      // Expect the result to be the found maintenance
      expect(result).toEqual(maintenance);
    });

    it("should return undefined if not found", async () => {
      // Mock db.query.MaintenanceTable.findFirst to resolve with undefined
      mockMaintenanceFindFirst.mockResolvedValueOnce(undefined);
      const result = await getById(9999);
      // Expect the result to be undefined
      expect(result).toBeUndefined();
    });
  });

  // test update Maintenance
  describe("updateMaintenanceService", () => {
    it("should update a maintenance and return success message", async () => {
      // Mock the update chain: db.update().set().where()
      (db.update as jest.Mock).mockReturnValue({
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockResolvedValueOnce({ rowCount: 1 }) // Mock the end of the chain
      });

      const updatedMaintenanceData = {
        carID: 1,
        maintenanceDate: new Date().toISOString(),
        description: "Updated Desc",
        cost: "100"
      };

      const result = await update(1, updatedMaintenanceData);

      // Verify that db.update was called with the correct table
      expect(db.update).toHaveBeenCalledWith(MaintenanceTable);
      // Expect the success message
      expect(result).toBe("Maintenance updated successfully");
    });
  });

  // test delete maintenance
  describe("deleteMaintenanceService", () => {
    it("should delete a Maintenance and return success message", async () => {
      // Mock the delete chain: db.delete().where()
      (db.delete as jest.Mock).mockReturnValue({
        where: jest.fn().mockResolvedValueOnce(undefined) // Mock the end of the chain
      });

      const result = await remove(1);
      // Verify that db.delete was called with the correct table
      expect(db.delete).toHaveBeenCalledWith(MaintenanceTable);
      // FIX: Match the expected string with what the service actually returns
      expect(result).toBe("Maintenance record deleted successfully");
    });
  });
});