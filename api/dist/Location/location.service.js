"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationsWithAssignedCarsService = exports.getAllLocationsWithCarsService = exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const db_1 = __importDefault(require("../Drizzle/db"));
const schema_1 = require("../Drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
// Get all locations
const getAll = async () => {
    // Corrected: findMany needs to be called as a function
    const locations = await db_1.default.query.LocationTable.findMany();
    return locations;
};
exports.getAll = getAll;
// Get location by ID
const getById = async (id) => {
    const location = await db_1.default.query.LocationTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.LocationTable.locationID, id)
    });
    return location;
};
exports.getById = getById;
// Create a new location
const create = async (location) => {
    const [inserted] = await db_1.default.insert(schema_1.LocationTable).values(location).returning();
    // Corrected: Return the inserted object if available, otherwise null
    if (inserted) {
        return inserted;
    }
    return null; // Return null if insertion fails or no record is returned
};
exports.create = create;
// Update location by ID
const update = async (id, location) => {
    await db_1.default.update(schema_1.LocationTable).set(location).where((0, drizzle_orm_1.eq)(schema_1.LocationTable.locationID, id));
    return "Location updated successfully";
};
exports.update = update;
// Delete location by ID
const remove = async (id) => {
    // It's good practice to check if a record was actually deleted,
    // though the test only checks for the success message.
    const [deleted] = await db_1.default.delete(schema_1.LocationTable).where((0, drizzle_orm_1.eq)(schema_1.LocationTable.locationID, id)).returning();
    if (deleted) {
        return "Location deleted successfully";
    }
    return "Location not found or could not be deleted"; // More descriptive message
};
exports.remove = remove;
// Get all locations with associated cars (left join)
const getAllLocationsWithCarsService = async () => {
    return await db_1.default.select({
        locationID: schema_1.LocationTable.locationID,
        locationName: schema_1.LocationTable.locationName,
        address: schema_1.LocationTable.address,
        carID: schema_1.CarTable.carID,
        carModel: schema_1.CarTable.carModel,
    })
        .from(schema_1.LocationTable)
        .leftJoin(schema_1.CarTable, (0, drizzle_orm_1.eq)(schema_1.LocationTable.locationID, schema_1.CarTable.locationID));
};
exports.getAllLocationsWithCarsService = getAllLocationsWithCarsService;
// Get locations that have assigned cars (inner join)
const getLocationsWithAssignedCarsService = async () => {
    return await db_1.default.select({
        locationID: schema_1.LocationTable.locationID,
        locationName: schema_1.LocationTable.locationName,
        carModel: schema_1.CarTable.carModel,
        year: schema_1.CarTable.year,
    })
        .from(schema_1.LocationTable)
        .innerJoin(schema_1.CarTable, (0, drizzle_orm_1.eq)(schema_1.LocationTable.locationID, schema_1.CarTable.locationID));
};
exports.getLocationsWithAssignedCarsService = getLocationsWithAssignedCarsService;
