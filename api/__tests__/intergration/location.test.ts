import request from "supertest";
import express from "express";
import * as LocationService from "../../src/location/location.service";
import {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
  
} from "../../src/location/location.controller";

const app = express();
app.use(express.json());

app.get("/locations", getAllLocations);
app.get("/locations/:id", getLocationById as any);
app.post("/locations", createLocation as any);
app.put("/locations/:id", updateLocation as any);
app.delete("/locations/:id", deleteLocation as any);


jest.mock("../../src/location/location.service");

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("Location Controller", () => {
  test("GET /locations should return all locations", async () => {
    (LocationService.getAll as jest.Mock).mockResolvedValue([
      {
        locationID: 1,
        locationName: "Nairobi",
        address: "123 Nairobi",
        contactNumber: "1234567890",
      },
      {
        locationID: 2,
        locationName: "Eldoret",
        address: "Eldoret",
        contactNumber: "0987654321",
      },
    ]);

    const response = await request(app).get("/locations");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        locationID: 1,
        locationName: "Nairobi",
        address: "123 Nairobi",
        contactNumber: "1234567890",
      },
      {
        locationID: 2,
        locationName: "Eldoret",
        address: "Eldoret",
        contactNumber: "0987654321",
      },
    ]);
  });

  test("GET /locations/:id should return location by id", async () => {
    (LocationService.getById as jest.Mock).mockResolvedValue({
      locationID: 1,
      locationName: "Nairobi",
      address: "123 Nairobi",
      contactNumber: "1234567890",
    });

    const response = await request(app).get("/locations/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      locationID: 1,
      locationName: "Nairobi",
      address: "123 Nairobi",
      contactNumber: "1234567890",
    });
  });

  test("POST /locations should create a new location", async () => {
    const newLocation = {
      locationName: "Nairobi",
      address: "123 Nairobi",
      contactNumber: "1234567890",
    };

    (LocationService.create as jest.Mock).mockResolvedValue({
      locationID: 1,
      ...newLocation,
    });

    const response = await request(app).post("/locations").send(newLocation);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      locationID: 1,
      ...newLocation,
    });
  });

  test("PUT /locations/:id should update a location", async () => {
    const updatedLocation = {
      locationName: "Nairobi",
      address: "Updated Address",
      contactNumber: "1234567890",
    };

    (LocationService.update as jest.Mock).mockResolvedValue({
      locationID: 1,
      ...updatedLocation,
    });

    const response = await request(app).put("/locations/1").send(updatedLocation);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      locationID: 1,
      ...updatedLocation,
    });
  });

 


  
  test("GET /locations should return 500 on service error", async () => {
    (LocationService.getAll as jest.Mock).mockRejectedValue(new Error("Failed to fetch locations"));
    const response = await request(app).get("/locations");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to fetch locations" });
  });


  test("POST /locations should return 500 on service error", async () => {
    (LocationService.create as jest.Mock).mockRejectedValue(new Error("Failed to create location"));
    const response = await request(app).post("/locations").send({});
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to create location" });
  });

  test("PUT /locations/:id should return 500 on service error", async () => {
    (LocationService.update as jest.Mock).mockRejectedValue(new Error("Failed to update location"));
    const response = await request(app).put("/locations/1").send({});
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to update location" });
  });

  test("DELETE /locations/:id should return 500 on service error", async () => {
    (LocationService.remove as jest.Mock).mockRejectedValue(new Error("Failed to delete location"));
    const response = await request(app).delete("/locations/1");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to delete location" });
  });

  
});
