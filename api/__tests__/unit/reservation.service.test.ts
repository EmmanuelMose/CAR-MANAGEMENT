import { getAll, getById, remove, update, create } from "../../src/reservation/reservation.service";
import db from "../../src/Drizzle/db";
import { ReservationTable } from "../../src/Drizzle/schema";
import { eq } from 'drizzle-orm';

jest.mock("../../src/Drizzle/db", () => {
  const mockReservationTableQuery = {
    findMany: jest.fn(),
    findFirst: jest.fn()
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
    })),
    query: {
      ReservationTable: mockReservationTableQuery,
    },
  };
});

const mockReservationFindMany = (db.query.ReservationTable.findMany as jest.Mock);
const mockReservationFindFirst = (db.query.ReservationTable.findFirst as jest.Mock);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Reservation Service", () => {
  describe("createReservationService", () => {
    it("should insert a Reservation and return the inserted Reservation", async () => {
      const reservationToInsert = {
        customerID: 1,
        carID: 1,
        reservationDate: "2024-06-01",
        pickupDate: "2024-06-02",
        returnDate: null
      };
      const insertedResult = { reservationID: 1, ...reservationToInsert };

      (db.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValueOnce([insertedResult]),
      });

      const result = await create(reservationToInsert);

      expect(db.insert).toHaveBeenCalledWith(ReservationTable);
      expect(result).toEqual(insertedResult);
    });

    it("should return null if insertion fails", async () => {
      (db.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValueOnce([null])
      });

      const reservationToInsert = {
        customerID: 1,
        carID: 1,
        reservationDate: "2024-06-01",
        pickupDate: "2024-06-02",
        returnDate: null
      };

      const result = await create(reservationToInsert);
      expect(result).toBeNull();
    });
  });

  describe("getReservationService", () => {
    it("should return all Reservation", async () => {
      const reservations = [
        { reservationID: 1, customerID: 1, carID: 101, reservationDate: "2024-06-01", pickupDate: "2024-06-05", returnDate: null },
        { reservationID: 2, customerID: 2, carID: 102, reservationDate: "2024-06-02", pickupDate: "2024-06-06", returnDate: null }
      ];
      mockReservationFindMany.mockResolvedValueOnce(reservations);

      const result = await getAll();
      expect(result).toEqual(reservations);
    });

    it("should return empty array if no reservations", async () => {
      mockReservationFindMany.mockResolvedValueOnce([]);
      const result = await getAll();
      expect(result).toEqual([]);
    });
  });

  describe("getReservationByIdService", () => {
    it("should return a reservation if found", async () => {
      const reservation = {
        reservationID: 1,
        customerID: 1,
        carID: 101,
        reservationDate: "2024-06-01",
        pickupDate: "2024-06-05",
        returnDate: null
      };
      mockReservationFindFirst.mockResolvedValueOnce(reservation);

      const result = await getById(1);
      expect(mockReservationFindFirst).toHaveBeenCalledWith({
        where: eq(ReservationTable.reservationID, 1)
      });
      expect(result).toEqual(reservation);
    });

    it("should return undefined if not found", async () => {
      mockReservationFindFirst.mockResolvedValueOnce(undefined);
      const result = await getById(9999);
      expect(result).toBeUndefined();
    });
  });

  describe("updateReservationService", () => {
    it("should update a reservation and return the updated reservation object", async () => {
      const updatedReservationData = {
        customerID: 1,
        carID: 1,
        reservationDate: "2024-06-01",
        pickupDate: "2024-06-02",
        returnDate: "2024-06-05"
      };
      const returnedUpdatedObject = { reservationID: 1, ...updatedReservationData };

      (db.update as jest.Mock).mockReturnValue({
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValueOnce([returnedUpdatedObject])
      });

      const result = await update(1, updatedReservationData);

      expect(db.update).toHaveBeenCalledWith(ReservationTable);
      expect(result).toEqual(returnedUpdatedObject);
    });
  });

  describe("deleteReservationService", () => {
    it("should delete a reservation and return success message", async () => {
      (db.delete as jest.Mock).mockReturnValue({
        where: jest.fn().mockResolvedValueOnce(undefined)
      });

      const result = await remove(1);
      expect(db.delete).toHaveBeenCalledWith(ReservationTable);
      expect(result).toBe("Reservation deleted successfully");
    });
  });
});