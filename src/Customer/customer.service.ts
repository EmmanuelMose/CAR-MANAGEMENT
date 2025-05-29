import db from '../Drizzle/db';
import { CustomerTable } from '../Drizzle/schema';
import { eq } from 'drizzle-orm';


// Fetch all customers
export const getAll = async () => {
  return await db.select().from(CustomerTable);
};

// Fetch a customer by ID
export const getById = async (id: number) => {
  const result = await db.select().from(CustomerTable).where(eq(CustomerTable.customerID, id));
  return result[0];
};

// Create a new customer
export const create = async (data: any) => {
  const result = await db.insert(CustomerTable).values(data).returning();
  return result[0];
};

// Update a customer
export const update = async (id: number, data: any) => {
  const result = await db
    .update(CustomerTable)
    .set(data)
    .where(eq(CustomerTable.customerID, id))
    .returning();
  return result[0];
};

// Delete a customer
export const remove = async (id: number) => {
  await db.delete(CustomerTable).where(eq(CustomerTable.customerID, id));
};
