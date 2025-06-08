import  db  from '../Drizzle/db';
import { BookingsTable, CarTable, LocationTable } from '../Drizzle/schema';
import { count, eq, sum } from 'drizzle-orm';

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

// Get all cars with their location details
export const getAllCarsWithLocation = async () => {
  return await db
    .select({
      carID: CarTable.carID,
      carModel: CarTable.carModel,
      year: CarTable.year,
      color: CarTable.color,
      rentalRate: CarTable.rentalRate,
      availability: CarTable.availability,
      location: {
        locationID: LocationTable.locationID,
        locationName: LocationTable.locationName,
        address: LocationTable.address,
        contactNumber: LocationTable.contactNumber
      }
    })
    .from(CarTable)
    .leftJoin(LocationTable as any, eq(CarTable.locationID, LocationTable.locationID));
};

// Get cars with their booking history and total revenue
export const getCarsWithBookingStats = async () => {
  return await db
    .select({
      carID: CarTable.carID,
      carModel: CarTable.carModel,
      year: CarTable.year,
      color: CarTable.color,
      rentalRate: CarTable.rentalRate,
      location: {
        locationName: LocationTable.locationName
      },
      bookingCount: count(BookingsTable.bookingID).as('bookingCount'),
      totalRevenue: sum(BookingsTable.totalAmount).as('totalRevenue')
    })
    .from(CarTable)
    .leftJoin(LocationTable as any, eq(CarTable.locationID, LocationTable.locationID))
    .leftJoin(BookingsTable as any, eq(CarTable.carID, BookingsTable.carID))
    .groupBy(CarTable.carID, LocationTable.locationName);
};