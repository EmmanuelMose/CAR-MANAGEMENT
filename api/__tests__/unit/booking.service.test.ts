import { create, getAll, getById, remove, update } from "../../src/booking/booking.service";
import db from "../../src/Drizzle/db";
import { BookingsTable } from "../../src/Drizzle/schema";

// Mock the modules
jest.mock("../../src/Drizzle/db", () => ({
  __esModule: true,
  default: {
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: {
      BookingsTable: {
        findMany: jest.fn(),
        findFirst: jest.fn()
      }
    }
  }
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Booking Service", () => {

  // Test create booking
  describe("createBookingService", () => {
    it("should insert a booking and return the inserted booking", async () => {
      const booking = {
        customerID: 1,
        carID: 2,
        rentalStartDate: "2024-06-01",
        rentalEndDate: "2024-06-10",
        bookingID: 1,
        totalAmount: "100.00"
      };

      const inserted = { id: 1, ...booking };
      (db.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValueOnce([inserted])
        })
      });

      const result = await create(booking);
      expect(db.insert).toHaveBeenCalledWith(BookingsTable);
      expect(result).toEqual(inserted);
    });

    it("should return null if insertion fails", async () => {
      (db.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValueOnce([null])
        })
      });

      const booking = {
        customerID: 2,
        carID: 3,
        rentalStartDate: "2024-07-01",
        rentalEndDate: "2024-07-10",
        bookingID: 2,
        totalAmount: "200.00"
      };

      const result = await create(booking);
      expect(result).toBeNull();
    });
  });

  // Test get all bookings
  describe("getBookingsService", () => {
    it("should return all bookings", async () => {
      const bookings = [
        { id: 1, bookingName: "Booking 1", customerId: 1, rentalStartDate: "2024-06-01", rentalEndDate: "2024-06-05" },
        { id: 2, bookingName: "Booking 2", customerId: 2, rentalStartDate: "2024-06-10", rentalEndDate: "2024-06-15" }
      ];
      (db.query.BookingsTable.findMany as jest.Mock).mockResolvedValueOnce(bookings);

      const result = await getAll();
      expect(db.query.BookingsTable.findMany).toHaveBeenCalled();
      expect(result).toEqual(bookings);
    });

    it("should return empty array if no bookings", async () => {
      (db.query.BookingsTable.findMany as jest.Mock).mockResolvedValueOnce([]);
      const result = await getAll();
      expect(result).toEqual([]);
    });
  });

  // Test get booking by ID
  describe("getBookingsByIdService", () => {
    it("should return a booking if found", async () => {
      const booking = {
        bookingID: 1,
        customerID: 1,
        carID: 2,
        rentalStartDate: "2024-06-01",
        rentalEndDate: "2024-06-10",
        totalAmount: "100.00"
      };
      (db.query.BookingsTable.findFirst as jest.Mock).mockResolvedValueOnce(booking);

      const result = await getById(1);
      expect(db.query.BookingsTable.findFirst).toHaveBeenCalled();
      expect(result).toEqual(booking);
    });

    it("should return undefined if not found", async () => {
      (db.query.BookingsTable.findFirst as jest.Mock).mockResolvedValueOnce(undefined);
      const result = await getById(9999);
      expect(result).toBeUndefined();
    });
  });

  // Test update booking
  describe("updateBookingService", () => {
    it("should update a booking and return the updated object", async () => {
      const bookingUpdate = {
        customerID: 1,
        carID: 2,
        rentalStartDate: "2024-06-01",
        rentalEndDate: "2024-06-10",
        totalAmount: "100.00"
      };

      (db.update as jest.Mock).mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValueOnce(undefined)
        })
      });

      const result = await update(1, bookingUpdate);
      expect(db.update).toHaveBeenCalledWith(BookingsTable);
      expect(result).toEqual({ bookingID: 1, ...bookingUpdate });
    });
  });

  // // Test delete booking
  // describe("removeBookingService", () => {
  //   it("should delete a booking and return success message", async () => {
  //     (db.delete as jest.Mock).mockReturnValue({
  //       where: jest.fn().mockReturnValue({
  //         returning: jest.fn().mockResolvedValueOnce(undefined)
  //       })
  //     });

  //     const result = await remove(1);
  //     expect(db.delete).toHaveBeenCalledWith(BookingsTable);
  //     expect(result).toBe("Booking deleted successfully");
  //   });
  // });

});
