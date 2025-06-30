import { create, getAll, getById, update, remove } from "../../src/insurance/insurance.service";
import db from "../../src/Drizzle/db";
import { InsuranceTable } from "../../src/Drizzle/schema";
import { eq } from 'drizzle-orm';

jest.mock("../../src/Drizzle/db", () => {
  const mockInsuranceTableQuery = {
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
    })),
    delete: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
    })),
    query: {
      InsuranceTable: mockInsuranceTableQuery,
    },
  };
});

const mockInsuranceFindMany = (db.query.InsuranceTable.findMany as jest.Mock);
const mockInsuranceFindFirst = (db.query.InsuranceTable.findFirst as jest.Mock);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Insurance Service", () => {
  describe("createInsuranceService", () => {
    it("should insert an insurance and return the inserted insurance", async () => {
      const insuranceToInsert = {
        carID: 1,
        insuranceProvider: "Test Insurance Provider",
        policyNumber: "POL123456",
        startDate: new Date().toISOString(),
        endDate: null
      };
      const insertedResult = { insuranceID: 1, ...insuranceToInsert };

      (db.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValueOnce([insertedResult]),
      });

      const result = await create(insuranceToInsert);
      expect(db.insert).toHaveBeenCalledWith(InsuranceTable);
      expect(result).toEqual(insertedResult);
    });

    it("should return null if insertion fails", async () => {
      (db.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValueOnce([null])
      });
      const insurance = {
        carID: 2,
        insuranceProvider: "Fail Insurance Provider",
        policyNumber: "POL654321",
        startDate: new Date().toISOString(),
        endDate: null
      };

      const result = await create(insurance);
      expect(result).toBeNull();
    });
  });

  describe("getInsuranceService", () => {
    it("should return all Insurance", async () => {
      const insurances = [
        {
          insuranceID: 1,
          carID: 101,
          insuranceProvider: "Provider A",
          policyNumber: "POLICY001",
          startDate: new Date().toISOString(),
          endDate: null
        },
        {
          insuranceID: 2,
          carID: 102,
          insuranceProvider: "Provider B",
          policyNumber: "POLICY002",
          startDate: new Date().toISOString(),
          endDate: null
        }
      ];
      mockInsuranceFindMany.mockResolvedValueOnce(insurances);

      const result = await getAll();
      expect(result).toEqual(insurances);
    });

    it("should return empty array if no Insurance", async () => {
      mockInsuranceFindMany.mockResolvedValueOnce([]);
      const result = await getAll();
      expect(result).toEqual([]);
    });
  });

  describe("getInsuranceByIdService", () => {
    it("should return an Insurance if found", async () => {
      const insurance = {
        insuranceID: 1,
        carID: 101,
        insuranceProvider: "Provider X",
        policyNumber: "POLICYXYZ",
        startDate: new Date().toISOString(),
        endDate: null
      };
      mockInsuranceFindFirst.mockResolvedValueOnce(insurance);

      const result = await getById(1);
      expect(mockInsuranceFindFirst).toHaveBeenCalledWith({
        where: eq(InsuranceTable.insuranceID, 1)
      });
      expect(result).toEqual(insurance);
    });

    it("should return undefined if not found", async () => {
      mockInsuranceFindFirst.mockResolvedValueOnce(undefined);
      const result = await getById(9999);
      expect(result).toBeUndefined();
    });
  });

  describe("updateInsuranceService", () => {
    it("should update an Insurance and return success message", async () => {
      (db.update as jest.Mock).mockReturnValue({
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockResolvedValueOnce(undefined) // Mock the end of the chain
      });

      const updatedInsuranceData = {
        carID: 1,
        insuranceProvider: "Updated Provider",
        policyNumber: "UPDATED123",
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString() // Example updated field
      };

      const result = await update(1, updatedInsuranceData); // Call update() instead of remove()

      expect(db.update).toHaveBeenCalledWith(InsuranceTable);
      expect(result).toBe("Insurance updated successfully");
    });
  });

  describe("deleteInsuranceService", () => {
    it("should delete an Insurance and return success message", async () => {
      (db.delete as jest.Mock).mockReturnValue({
        where: jest.fn().mockResolvedValueOnce(undefined)
      });

      const insuranceToDelete = {
        insuranceID: 1,
        carID: 101,
        insuranceProvider: "Provider X",
        policyNumber: "POLICYXYZ",
        startDate: new Date().toISOString(),
        endDate: null
      };
      const result = await remove(1, insuranceToDelete);
      expect(db.delete).toHaveBeenCalledWith(InsuranceTable);
      // Ensure the expected string matches the service's return value
      expect(result).toBe("Insurance policy deleted successfully");
    });
  });
});