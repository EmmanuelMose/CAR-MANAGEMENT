import request from "supertest";
import express from "express";
import * as BookingService from "../../src/booking/booking.service";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from "../../src/booking/booking.controller";

const app = express();
app.use(express.json());

app.get("/bookings", getAllBookings);
app.get("/bookings/:id", getBookingById as any);
app.post("/bookings", createBooking as any);
app.put("/bookings/:id", updateBooking as any);
app.delete("/bookings/:id", deleteBooking as any);

jest.mock("../../src/booking/booking.service");

beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

describe("Booking Controller", () => {
  test("GET /bookings should return all bookings", async () => {
    (BookingService.getAll as jest.Mock).mockResolvedValue([
      {
        bookingID: 1,
        carID: 1,
        customerID: 1,
        rentalStartDate: "2023-01-01",
        rentalEndDate: "2023-01-10",
        totalAmount: "1000.00",
      },
    ]);

    const response = await request(app).get("/bookings");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        bookingID: 1,
        carID: 1,
        customerID: 1,
        rentalStartDate: "2023-01-01",
        rentalEndDate: "2023-01-10",
        totalAmount: "1000.00",
      },
    ]);
  });

  test("GET /bookings/:id should return a single booking", async () => {
    (BookingService.getById as jest.Mock).mockResolvedValue({
      bookingID: 1,
      carID: 1,
      customerID: 1,
      rentalStartDate: "2023-01-01",
      rentalEndDate: "2023-01-10",
      totalAmount: "1000.00",
    });

    const response = await request(app).get("/bookings/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      bookingID: 1,
      carID: 1,
      customerID: 1,
      rentalStartDate: "2023-01-01",
      rentalEndDate: "2023-01-10",
      totalAmount: "1000.00",
    });
  });

  test("POST /bookings should create a new booking", async () => {
    const newBooking = {
      carID: 1,
      customerID: 1,
      rentalStartDate: "2023-01-01",
      rentalEndDate: "2023-01-10",
      totalAmount: "1000.00",
    };

    (BookingService.create as jest.Mock).mockResolvedValue({
      bookingID: 1,
      ...newBooking,
    });

    const response = await request(app).post("/bookings").send(newBooking);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      bookingID: 1,
      ...newBooking,
    });
  });

  test("PUT /bookings/:id should update a booking", async () => {
    const updatedBooking = {
      carID: 1,
      customerID: 1,
      rentalStartDate: "2023-01-01",
      rentalEndDate: "2023-01-10",
      totalAmount: "1000.00",
    };

    (BookingService.update as jest.Mock).mockResolvedValue({
      bookingID: 1,
      ...updatedBooking,
    });

    const response = await request(app).put("/bookings/1").send(updatedBooking);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      bookingID: 1,
      ...updatedBooking,
    });
  });

  test("DELETE /bookings/:id should delete a booking", async () => {
    (BookingService.remove as jest.Mock).mockResolvedValue(true);

    const response = await request(app).delete("/bookings/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Booking deleted successfully" });
  });

  test("DELETE /bookings/:id should return 404 if booking not found", async () => {
    (BookingService.remove as jest.Mock).mockResolvedValue(false);

    const response = await request(app).delete("/bookings/999");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Booking not found" });
  });
});
