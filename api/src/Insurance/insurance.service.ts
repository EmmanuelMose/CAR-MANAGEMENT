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
}

// Get all insurance policies
export const getAll = async () => {
    const insurances = await db.query.InsuranceTable.findMany();
    return insurances;

}


//get insurance by id
export const getById = async (id: number) => {
const insurance=await db.query.InsuranceTable.findFirst({
    where: eq(InsuranceTable.insuranceID, id)
})
return insurance
}


//update insurance by id
export const update = async (id: number, insurance: TIInsurance) => {
    await db.update(InsuranceTable).set(insurance).where(eq(InsuranceTable.insuranceID, id))
    return "Insurance updated successfully";
}


//delete insurance by id
export const remove = async (insuranceID: number, p0: { insuranceID: number; carID: number; insuranceProvider: string; policyNumber: string; startDate: string; endDate: null; }) => {
    await db
    .delete(InsuranceTable)
    .where(eq(InsuranceTable.insuranceID, insuranceID))

    return "Insurance policy deleted successfully";
};




