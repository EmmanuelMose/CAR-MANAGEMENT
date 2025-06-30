import request from "supertest";
import express from "express";
import * as MaintenanceService from "../../src/maintenance/maintenance.service";
import {
  createMaintenance,
  getAllMaintenance,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenance,
} from "../../src/maintenance/maintenance.controller";

// Mock the service
jest.mock("../../src/maintenance/maintenance.service");

// Setup Express app
const app = express();
app.use(express.json());
app.get("/maintenance", getAllMaintenance);
app.get("/maintenance/:id", getMaintenanceById);
app.post("/maintenance", createMaintenance);
app.put("/maintenance/:id", updateMaintenance);
app.delete("/maintenance/:id", deleteMaintenance);

describe("Maintenance Controller", () => {
  const mockData = {
    maintenanceID: 1,
    carID: 1,
    maintenanceDate: "2024-06-01",
    description: "Oil change and tire rotation",
    cost: 250.0,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /maintenance - should return all maintenance records", async () => {
    (MaintenanceService.getAll as jest.Mock).mockResolvedValue([mockData]);

    const response = await request(app).get("/maintenance");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockData]);
  });

  test("GET /maintenance/:id - should return a single maintenance record", async () => {
    (MaintenanceService.getById as jest.Mock).mockResolvedValue(mockData);

    const response = await request(app).get("/maintenance/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  

  test("POST /maintenance - should create a new maintenance record", async () => {
    const newData: Omit<typeof mockData, "maintenanceID"> & { maintenanceID?: number } = { ...mockData };
    delete newData.maintenanceID;

    (MaintenanceService.create as jest.Mock).mockResolvedValue(mockData);

    const response = await request(app).post("/maintenance").send(newData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockData);
  });

  test("PUT /maintenance/:id - should update a maintenance record", async () => {
    const updatedMessage = "Maintenance updated successfully";
    (MaintenanceService.update as jest.Mock).mockResolvedValue(updatedMessage);

    const response = await request(app).put("/maintenance/1").send(mockData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedMessage);
  });

  test("DELETE /maintenance/:id - should delete a maintenance record", async () => {
    const deletedMessage = "Maintenance record deleted successfully";
    (MaintenanceService.remove as jest.Mock).mockResolvedValue(deletedMessage);

    const response = await request(app).delete("/maintenance/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Maintenance record deleted" });
  });

  test("GET /maintenance - should return 500 on service failure", async () => {
    (MaintenanceService.getAll as jest.Mock).mockRejectedValue(new Error("Error"));

    const response = await request(app).get("/maintenance");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to fetch maintenance records" });
  });

  test("POST /maintenance - should return 500 on service failure", async () => {
    (MaintenanceService.create as jest.Mock).mockRejectedValue(new Error("Error"));

    const response = await request(app).post("/maintenance").send(mockData);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to create maintenance record" });
  });

  test("PUT /maintenance/:id - should return 500 on service failure", async () => {
    (MaintenanceService.update as jest.Mock).mockRejectedValue(new Error("Error"));

    const response = await request(app).put("/maintenance/1").send(mockData);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to update maintenance record" });
  });

  test("DELETE /maintenance/:id - should return 500 on service failure", async () => {
    (MaintenanceService.remove as jest.Mock).mockRejectedValue(new Error("Error"));

    const response = await request(app).delete("/maintenance/1");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to delete maintenance record" });
  });
});
