import  db  from '../Drizzle/db';
import { BookingsTable, CarTable, LocationTable, TICar } from '../Drizzle/schema';
import { count, eq, sum } from 'drizzle-orm';

// Get all cars
export const getAll = async () => {
    const cars=await db.query.CarTable.findMany()
    return cars
}


// Get car by ID
export const getById = async (id: number) => {
    const car = await db.query.CarTable.findFirst({
        where: eq(CarTable.carID, id)
    })

    return car
}


//create a new car
export const createCarService = async (car: TICar) => {
    const [inserted] = await db.insert(CarTable).values(car).returning()
    if (inserted) {
        return inserted;
    }
    return null
}


// Update car by ID
export const update = async (id: number, car: TICar) => {
    await db.update(CarTable).set(car).where(eq(CarTable.carID, id))

return  "Car updated successfully";
}

// Delete car by ID
export const remove = async (id: number) => {
    await db.delete(CarTable).where(eq(CarTable.carID, id)).returning()
    return "Car deleted successfully";
}   

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