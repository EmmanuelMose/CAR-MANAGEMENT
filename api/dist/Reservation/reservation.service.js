"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const db_1 = __importDefault(require("../Drizzle/db"));
const schema_1 = require("../Drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
// Get all reservations
const getAll = async () => {
    const reservations = await db_1.default.query.ReservationTable.findMany();
    return reservations;
};
exports.getAll = getAll;
// Get reservation by ID
const getById = async (id) => {
    const reservation = await db_1.default.query.ReservationTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.ReservationTable.reservationID, id)
    });
    return reservation;
};
exports.getById = getById;
// Create a new reservation
const create = async (reservation) => {
    const [inserted] = await db_1.default.insert(schema_1.ReservationTable).values(reservation).returning();
    if (inserted) {
        return inserted;
    }
    return null;
};
exports.create = create;
// Update a reservation
const update = async (id, data) => {
    const result = await db_1.default
        .update(schema_1.ReservationTable)
        .set(data)
        .where((0, drizzle_orm_1.eq)(schema_1.ReservationTable.reservationID, id))
        .returning();
    return result[0];
};
exports.update = update;
//delete reservation by ID
const remove = async (id) => {
    await db_1.default.delete(schema_1.ReservationTable).where((0, drizzle_orm_1.eq)(schema_1.ReservationTable.reservationID, id));
    return "Reservation deleted successfully";
};
exports.remove = remove;
