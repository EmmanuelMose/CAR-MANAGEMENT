"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentsWithBooking = exports.remove = exports.updateById = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const db_1 = __importDefault(require("../Drizzle/db"));
const schema_1 = require("../Drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
//Get all payments 
const getAll = async () => {
    const payments = await db_1.default.query.PaymentTable.findMany();
    return payments;
};
exports.getAll = getAll;
// Get a payment by ID
const getById = async (paymentId) => {
    const payment = await db_1.default.query.PaymentTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.PaymentTable.paymentID, paymentId)
    });
    return payment;
};
exports.getById = getById;
// Create a new payment
const create = async (payment) => {
    const [inserted] = await db_1.default.insert(schema_1.PaymentTable).values(payment).returning();
    if (inserted) {
        return inserted;
    }
    return null;
};
exports.create = create;
// Update a payment
const update = async (id, data) => {
    const result = await db_1.default
        .update(schema_1.PaymentTable)
        .set(data)
        .where((0, drizzle_orm_1.eq)(schema_1.PaymentTable.paymentID, id))
        .returning();
    return result[0];
};
exports.update = update;
//update a payment by ID
const updateById = async (paymentId, payment) => {
    await db_1.default.update(schema_1.PaymentTable).set(payment).where((0, drizzle_orm_1.eq)(schema_1.PaymentTable.paymentID, paymentId));
    return "Payment updated successfully";
};
exports.updateById = updateById;
// Delete a payment by ID
const remove = async (paymentId) => {
    await db_1.default.delete(schema_1.PaymentTable).where((0, drizzle_orm_1.eq)(schema_1.PaymentTable.paymentID, paymentId)).returning();
    return "Payment deleted successfully";
};
exports.remove = remove;
// JOIN: payment + booking
const getPaymentsWithBooking = async () => {
    return db_1.default
        .select()
        .from(schema_1.PaymentTable)
        .innerJoin(schema_1.BookingsTable, (0, drizzle_orm_1.eq)(schema_1.PaymentTable.bookingID, schema_1.BookingsTable.bookingID));
};
exports.getPaymentsWithBooking = getPaymentsWithBooking;
