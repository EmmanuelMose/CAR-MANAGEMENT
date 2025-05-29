import  db  from '../Drizzle/db';
import { CarTable } from '../Drizzle/schema';
import { eq } from 'drizzle-orm';

// Get all cars
export const getAll = async () => {
  return await db.select().from(CarTable);
};

// Get a car by ID
export const getById = async (id: number) => {
  const result = await db.select().from(CarTable).where(eq(CarTable.carID, id));
  return result[0];
};

// Create a new car
export const createCarService = async (data: any) => {
  const result = await db.insert(CarTable).values(data).returning();
  return result[0];
};

// Update an existing car
export const update = async (id: number, data: any) => {
  const result = await db
    .update(CarTable)
    .set(data)
    .where(eq(CarTable.carID, id))
    .returning();
  return result[0];
};

// Delete a car
export const remove = async (id: number) => {
  await db.delete(CarTable).where(eq(CarTable.carID, id));
};