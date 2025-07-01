import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { InsuranceTable, TIInsurance } from "../Drizzle/schema";

// Create a new insurance policy
export const create = async (insurance: TIInsurance) => {
  const [inserted] = await db.insert(InsuranceTable).values(insurance).returning();
  if (inserted) {
    return inserted;
  }
  return null;
};

// Get all insurance policies
export const getAll = async () => {
  const insurances = await db.query.InsuranceTable.findMany();
  return insurances;
};

// Get insurance by ID
export const getById = async (id: number) => {
  const insurance = await db.query.InsuranceTable.findFirst({
    where: eq(InsuranceTable.insuranceID, id),
  });
  return insurance;
};

// Update insurance by ID
export const update = async (id: number, insurance: TIInsurance) => {
  await db.update(InsuranceTable).set(insurance).where(eq(InsuranceTable.insuranceID, id));
  return "Insurance updated successfully";
};

//Removed unused second parameter
export const remove = async (insuranceID: number, body: any) => {
  await db.delete(InsuranceTable).where(eq(InsuranceTable.insuranceID, insuranceID));
  return "Insurance policy deleted successfully";
};
