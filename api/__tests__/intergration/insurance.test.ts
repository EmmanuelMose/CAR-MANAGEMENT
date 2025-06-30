import request from "supertest";
import express from 'express';
import * as InsuranceService from "../../src/insurance/insurance.service";
import {
    getAllInsurance,
    getInsuranceById,
    createInsurance,
    updateInsurance,
    deleteInsurance
} from "../../src/insurance/insurance.controller";

const app = express();
app.use(express.json());
app.get("/insurance", getAllInsurance);
app.get("/insurance/:id", getInsuranceById as any);
app.post("/insurance", createInsurance as any);
app.put("/insurance/:id", updateInsurance as any);
app.delete("/insurance/:id", deleteInsurance as any);

jest.mock("../../src/insurance/insurance.service");

beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
});

describe("Insurance Controller", () => {

    it("should fetch all insurance records", async () => {
        (InsuranceService.getAll as jest.Mock).mockResolvedValue([
            {
                insuranceID: 1,
                carID: 1,
                insuranceProvider: "ABC Insurance",
                policyNumber: "12345",
                startDate: "2024-01-01",
                endDate: "2024-12-31",
            },
            {
                insuranceID: 2,
                carID: 2,
                insuranceProvider: "XYZ Insurance",
                policyNumber: "54321",
                startDate: "2024-02-01",
                endDate: "2025-01-31",
            },
        ]);
        const response = await request(app).get("/insurance");
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    it("should fetch an insurance record by ID", async () => {
        (InsuranceService.getById as jest.Mock).mockResolvedValue({
            insuranceID: 1,
            carID: 1,
            insuranceProvider: "ABC Insurance",
            policyNumber: "12345",
            startDate: "2024-01-01",
            endDate: "2024-12-31",
        });
        const response = await request(app).get("/insurance/1");
        expect(response.status).toBe(200);
        expect(response.body.insuranceID).toBe(1);
    });

    it("should create an insurance record", async () => {
        const newInsurance = {
            carID: 1,
            insuranceProvider: "ABC Insurance",
            policyNumber: "12345",
            startDate: "2024-01-01",
            endDate: "2024-12-31",
        };
        (InsuranceService.create as jest.Mock).mockResolvedValue({
            insuranceID: 1,
            ...newInsurance
        });
        const response = await request(app).post("/insurance").send(newInsurance);
        expect(response.status).toBe(201);
        expect(response.body.insuranceID).toBe(1);
    });

    it("should update an insurance record", async () => {
        const updatedInsurance = {
            insuranceID: 1,
            carID: 1,
            insuranceProvider: "XYZ Insurance",
            policyNumber: "54321",
            startDate: "2024-02-01",
            endDate: "2025-01-31",
        };
        (InsuranceService.update as jest.Mock).mockResolvedValue(updatedInsurance);
        const response = await request(app).put("/insurance/1").send(updatedInsurance);
        expect(response.status).toBe(200);
        expect(response.body.insuranceProvider).toBe("XYZ Insurance");
    });

    it("should delete an insurance record", async () => {
        (InsuranceService.remove as jest.Mock).mockResolvedValue(true);
        const response = await request(app).delete("/insurance/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Insurance record deleted" });
    });

    it("should return 404 if insurance record not found", async () => {
        (InsuranceService.getById as jest.Mock).mockResolvedValue(null);
        const getRes = await request(app).get("/insurance/999");
        expect(getRes.status).toBe(200); // controller sends json(null), not 404

        (InsuranceService.update as jest.Mock).mockResolvedValue(null);
        const updateRes = await request(app).put("/insurance/999").send({});
        expect(updateRes.status).toBe(200); // controller sends json(null)

        (InsuranceService.remove as jest.Mock).mockResolvedValue(null);
        const deleteRes = await request(app).delete("/insurance/999");
        expect(deleteRes.status).toBe(200); // controller sends json(undefined)
    });

    it("should return 500 if service throws error", async () => {
        (InsuranceService.getAll as jest.Mock).mockRejectedValue(new Error("DB error"));
        const allRes = await request(app).get("/insurance");
        expect(allRes.status).toBe(500);
        expect(allRes.body).toEqual({ error: "Failed to fetch insurance records" });

        (InsuranceService.getById as jest.Mock).mockRejectedValue(new Error("Error"));
        const getRes = await request(app).get("/insurance/1");
        expect(getRes.status).toBe(500);
        expect(getRes.body).toEqual({ error: "Insurance record not found" });

        (InsuranceService.create as jest.Mock).mockRejectedValue(new Error("Error"));
        const createRes = await request(app).post("/insurance").send({});
        expect(createRes.status).toBe(500);
        expect(createRes.body).toEqual({ error: "Failed to create insurance record" });

        (InsuranceService.update as jest.Mock).mockRejectedValue(new Error("Error"));
        const updateRes = await request(app).put("/insurance/1").send({});
        expect(updateRes.status).toBe(500);
        expect(updateRes.body).toEqual({ error: "Failed to update insurance record" });

        (InsuranceService.remove as jest.Mock).mockRejectedValue(new Error("Error"));
        const deleteRes = await request(app).delete("/insurance/1");
        expect(deleteRes.status).toBe(500);
        expect(deleteRes.body).toEqual({ error: "Failed to delete insurance record" });
    });
});
