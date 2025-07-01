"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const db_1 = __importDefault(require("../Drizzle/db"));
const schema_1 = require("../Drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
// Get all bookings
const getAll = async () => {
    const bookings = await db_1.default.query.BookingsTable.findMany();
    return bookings;
};
exports.getAll = getAll;
// Get booking by ID
const getById = async (id) => {
    const booking = await db_1.default.query.BookingsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingID, id),
    });
    return booking;
};
exports.getById = getById;
// Create booking
const create = async (data) => {
    const result = await db_1.default.insert(schema_1.BookingsTable).values(data).returning();
    return result[0];
};
exports.create = create;
// Update booking by ID
const update = async (id, booking) => {
    await db_1.default.update(schema_1.BookingsTable).set(booking).where((0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingID, id));
    return {
        bookingID: id,
        ...booking,
    };
};
exports.update = update;
// Delete booking by ID
const remove = async (id) => {
    const result = await db_1.default.delete(schema_1.BookingsTable).where((0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingID, id)).returning();
    return result.length > 0; // true if deleted, false if not found
};
exports.remove = remove;
