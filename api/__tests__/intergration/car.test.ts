import request from "supertest";
import express from "express";
import * as CarService from "../../src/car/car.service";
import {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
} from "../../src/car/car.controller";

// Set up express app
const app = express();
app.use(express.json());
app.get("/cars", getAllCars);
app.get("/cars/:id", getCarById as any);
app.post("/cars", createCar as any);
app.put("/cars/:id", updateCar as any);
app.delete("/cars/:id", deleteCar as any);

// Mock service
jest.mock("../../src/car/car.service");

describe("Car Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /cars should return all cars", async () => {
    (CarService.getAll as jest.Mock).mockResolvedValue([
      {
        carID: 1,
        carModel: "Toyota Corolla",
        year: "2020-01-01",
        color: "Red",
        rentalRate: "50.00",
        availability: true,
        locationID: 1,
      },
    ]);

    const res = await request(app).get("/cars");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        carID: 1,
        carModel: "Toyota Corolla",
        year: "2020-01-01",
        color: "Red",
        rentalRate: "50.00",
        availability: true,
        locationID: 1,
      },
    ]);
  });

  test("GET /cars/:id should return one car", async () => {
    (CarService.getById as jest.Mock).mockResolvedValue({
      carID: 1,
      carModel: "Toyota Corolla",
      year: "2020-01-01",
      color: "Red",
      rentalRate: "50.00",
      availability: true,
      locationID: 1,
    });

    const res = await request(app).get("/cars/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      carID: 1,
      carModel: "Toyota Corolla",
      year: "2020-01-01",
      color: "Red",
      rentalRate: "50.00",
      availability: true,
      locationID: 1,
    });
  });

  
  test("GET /cars/:id should return 500 if service throws error", async () => {
    (CarService.getById as jest.Mock).mockRejectedValue(new Error("Failed"));

    const response = await request(app).get("/cars/1");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Car not found" });
  });

  test("POST /cars should create a new car", async () => {
    const newCar = {
      carModel: "Subaru Outback",
      year: "2022-05-01",
      color: "Blue",
      rentalRate: "65.00",
      availability: true,
      locationID: 3,
    };

    (CarService.createCarService as jest.Mock).mockResolvedValue({
      carID: 10,
      ...newCar,
    });

    const res = await request(app).post("/cars").send(newCar);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      carID: 10,
      ...newCar,
    });
  });

  test("POST /cars should return 500 on failure", async () => {
    (CarService.createCarService as jest.Mock).mockRejectedValue(
      new Error("Failed")
    );

    const res = await request(app).post("/cars").send({
      carModel: "Fail",
      year: "2022-01-01",
      color: "Black",
      rentalRate: "80.00",
      availability: false,
      locationID: 2,
    });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Failed to create car" });
  });

  test("PUT /cars/:id should update a car", async () => {
    const updatedCar = {
      carModel: "Subaru Outback",
      year: "2022-05-01",
      color: "Black",
      rentalRate: "70.00",
      availability: false,
      locationID: 3,
    };

    (CarService.update as jest.Mock).mockResolvedValue({
      carID: 1,
      ...updatedCar,
    });

    const res = await request(app).put("/cars/1").send(updatedCar);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      carID: 1,
      ...updatedCar,
    });
  });

  
  test("PUT /cars/:id should return 500 on failure", async () => {
    (CarService.update as jest.Mock).mockRejectedValue(new Error("Update fail"));

    const res = await request(app).put("/cars/1").send({
      carModel: "Error",
      year: "2020-01-01",
      color: "White",
      rentalRate: "55.00",
      availability: true,
      locationID: 1,
    });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Failed to update car" });
  });

  

 

  test("DELETE /cars/:id should return 500 on failure", async () => {
    (CarService.remove as jest.Mock).mockRejectedValue(new Error("Delete fail"));

    const res = await request(app).delete("/cars/1");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Failed to delete car" });
  });
});
