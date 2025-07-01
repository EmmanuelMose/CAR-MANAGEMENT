"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarsWithBookingStats = exports.getAllCarsWithLocation = exports.remove = exports.update = exports.createCarService = exports.getById = exports.getAll = void 0;
const db_1 = __importDefault(require("../Drizzle/db"));
const schema_1 = require("../Drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
// Get all cars
const getAll = async () => {
    const cars = await db_1.default.query.CarTable.findMany();
    return cars;
};
exports.getAll = getAll;
// Get car by ID
const getById = async (id) => {
    const car = await db_1.default.query.CarTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.CarTable.carID, id)
    });
    return car;
};
exports.getById = getById;
//create a new car
const createCarService = async (car) => {
    const [inserted] = await db_1.default.insert(schema_1.CarTable).values(car).returning();
    if (inserted) {
        return inserted;
    }
    return null;
};
exports.createCarService = createCarService;
// Update car by ID
const update = async (id, car) => {
    await db_1.default.update(schema_1.CarTable).set(car).where((0, drizzle_orm_1.eq)(schema_1.CarTable.carID, id));
    return "Car updated successfully";
};
exports.update = update;
// Delete car by ID
const remove = async (id) => {
    await db_1.default.delete(schema_1.CarTable).where((0, drizzle_orm_1.eq)(schema_1.CarTable.carID, id)).returning();
    return "Car deleted successfully";
};
exports.remove = remove;
// Get all cars with their location details
const getAllCarsWithLocation = async () => {
    return await db_1.default
        .select({
        carID: schema_1.CarTable.carID,
        carModel: schema_1.CarTable.carModel,
        year: schema_1.CarTable.year,
        color: schema_1.CarTable.color,
        rentalRate: schema_1.CarTable.rentalRate,
        availability: schema_1.CarTable.availability,
        location: {
            locationID: schema_1.LocationTable.locationID,
            locationName: schema_1.LocationTable.locationName,
            address: schema_1.LocationTable.address,
            contactNumber: schema_1.LocationTable.contactNumber
        }
    })
        .from(schema_1.CarTable)
        .leftJoin(schema_1.LocationTable, (0, drizzle_orm_1.eq)(schema_1.CarTable.locationID, schema_1.LocationTable.locationID));
};
exports.getAllCarsWithLocation = getAllCarsWithLocation;
// Get cars with their booking history and total revenue
const getCarsWithBookingStats = async () => {
    return await db_1.default
        .select({
        carID: schema_1.CarTable.carID,
        carModel: schema_1.CarTable.carModel,
        year: schema_1.CarTable.year,
        color: schema_1.CarTable.color,
        rentalRate: schema_1.CarTable.rentalRate,
        location: {
            locationName: schema_1.LocationTable.locationName
        },
        bookingCount: (0, drizzle_orm_1.count)(schema_1.BookingsTable.bookingID).as('bookingCount'),
        totalRevenue: (0, drizzle_orm_1.sum)(schema_1.BookingsTable.totalAmount).as('totalRevenue')
    })
        .from(schema_1.CarTable)
        .leftJoin(schema_1.LocationTable, (0, drizzle_orm_1.eq)(schema_1.CarTable.locationID, schema_1.LocationTable.locationID))
        .leftJoin(schema_1.BookingsTable, (0, drizzle_orm_1.eq)(schema_1.CarTable.carID, schema_1.BookingsTable.carID))
        .groupBy(schema_1.CarTable.carID, schema_1.LocationTable.locationName);
};
exports.getCarsWithBookingStats = getCarsWithBookingStats;
