import db from '../Drizzle/db';
import { CarTable, LocationTable, TILocation } from '../Drizzle/schema';
import { eq } from 'drizzle-orm';

// Get all locations
export const getAll = async () => {
    // Corrected: findMany needs to be called as a function
    const locations = await db.query.LocationTable.findMany();
    return locations;
};

// Get location by ID
export const getById = async (id: number) => {
    const location = await db.query.LocationTable.findFirst({
        where: eq(LocationTable.locationID, id)
    });
    return location;
};

// Create a new location
export const create = async (location: TILocation) => {
    const [inserted] = await db.insert(LocationTable).values(location).returning();
    // Corrected: Return the inserted object if available, otherwise null
    if (inserted) {
        return inserted;
    }
    return null; // Return null if insertion fails or no record is returned
};

// Update location by ID
export const update = async (id: number, location: TILocation) => {
    await db.update(LocationTable).set(location).where(eq(LocationTable.locationID, id));
    return "Location updated successfully";
};

// Delete location by ID
export const remove = async (id: number) => {
    // It's good practice to check if a record was actually deleted,
    // though the test only checks for the success message.
    const [deleted] = await db.delete(LocationTable).where(eq(LocationTable.locationID, id)).returning();
    if (deleted) {
        return "Location deleted successfully";
    }
    return "Location not found or could not be deleted"; // More descriptive message
};

// Get all locations with associated cars (left join)
export const getAllLocationsWithCarsService = async () => {
    return await db.select({
        locationID: LocationTable.locationID,
        locationName: LocationTable.locationName,
        address: LocationTable.address,
        carID: CarTable.carID,
        carModel: CarTable.carModel,
    })
    .from(LocationTable)
    .leftJoin(CarTable as any, eq(LocationTable.locationID, CarTable.locationID));
};

// Get locations that have assigned cars (inner join)
export const getLocationsWithAssignedCarsService = async () => {
    return await db.select({
        locationID: LocationTable.locationID,
        locationName: LocationTable.locationName,
        carModel: CarTable.carModel,
        year: CarTable.year,
    })
    .from(LocationTable)
    .innerJoin(CarTable as any, eq(LocationTable.locationID, CarTable.locationID));
};
