import request from "supertest";
import express from "express";
import * as ReservationService from "../../src/reservation/reservation.service";
import {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
} from "../../src/reservation/reservation.controller";

const app = express();
app.use(express.json());

app.get("/reservations", getAllReservations);
app.get("/reservations/:id", getReservationById);
app.post("/reservations", createReservation);
app.put("/reservations/:id", updateReservation);
app.delete("/reservations/:id", deleteReservation);

jest.mock("../../src/reservation/reservation.service");

describe("Reservation Controller", () => {
  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /reservations - should return all reservations", async () => {
    (ReservationService.getAll as jest.Mock).mockResolvedValue([
      {
        reservationID: 1,
        customerID: 1,
        carID: 1,
        reservationDate: "2024-06-01",
        pickupDate: "2024-06-05",
        returnDate: "2024-06-10",
      },
    ]);
    const response = await request(app).get("/reservations");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test("GET /reservations/:id - should return a reservation", async () => {
    (ReservationService.getById as jest.Mock).mockResolvedValue({
      reservationID: 1,
      customerID: 1,
      carID: 1,
      reservationDate: "2024-06-01",
      pickupDate: "2024-06-05",
      returnDate: "2024-06-10",
    });
    const response = await request(app).get("/reservations/1");
    expect(response.status).toBe(200);
    expect(response.body.reservationID).toBe(1);
  });

  test("POST /reservations - should create a reservation", async () => {
    const data = {
      customerID: 1,
      carID: 1,
      reservationDate: "2024-06-01",
      pickupDate: "2024-06-05",
      returnDate: "2024-06-10",
    };
    (ReservationService.create as jest.Mock).mockResolvedValue({
      reservationID: 1,
      ...data,
    });

    const response = await request(app).post("/reservations").send(data);
    expect(response.status).toBe(201);
    expect(response.body.reservationID).toBe(1);
  });

  test("PUT /reservations/:id - should update a reservation", async () => {
    const data = {
      customerID: 1,
      carID: 1,
      reservationDate: "2024-06-01",
      pickupDate: "2024-06-05",
      returnDate: "2024-06-10",
    };
    (ReservationService.update as jest.Mock).mockResolvedValue({
      reservationID: 1,
      ...data,
    });

    const response = await request(app).put("/reservations/1").send(data);
    expect(response.status).toBe(200);
    expect(response.body.reservationID).toBe(1);
  });

  test("DELETE /reservations/:id - should delete a reservation", async () => {
    (ReservationService.remove as jest.Mock).mockResolvedValue(true);

    const response = await request(app).delete("/reservations/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Reservation deleted" });
  });

  

  

  test("GET /reservations - should return 500 on error", async () => {
    (ReservationService.getAll as jest.Mock).mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/reservations");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to fetch reservations" });
  });

  test("GET /reservations/:id - should return 500 on error", async () => {
    (ReservationService.getById as jest.Mock).mockRejectedValue(new Error("DB fail"));

    const response = await request(app).get("/reservations/1");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Reservation not found" });
  });

  test("POST /reservations - should return 500 on error", async () => {
    (ReservationService.create as jest.Mock).mockRejectedValue(new Error("DB fail"));

    const response = await request(app).post("/reservations").send({});
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to create reservation" });
  });

  test("PUT /reservations/:id - should return 500 on error", async () => {
    (ReservationService.update as jest.Mock).mockRejectedValue(new Error("DB fail"));

    const response = await request(app).put("/reservations/1").send({});
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to update reservation" });
  });

  test("DELETE /reservations/:id - should return 500 on error", async () => {
    (ReservationService.remove as jest.Mock).mockRejectedValue(new Error("DB fail"));

    const response = await request(app).delete("/reservations/1");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to delete reservation" });
  });
});
