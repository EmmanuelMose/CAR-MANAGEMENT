"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.getCustomerWithBookings = exports.getCustomerWithReservations = exports.verifyCustomerService = exports.getById = exports.remove = exports.getAll = exports.customerLoginService = exports.getCustomerByEmailService = void 0;
exports.update = update;
const db_1 = __importDefault(require("../Drizzle/db"));
const schema_1 = require("../Drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
//create a new customer
// (removed duplicate declaration)
//get customer by email
const getCustomerByEmailService = async (email) => {
    return await db_1.default.query.CustomerTable.findFirst({
        where: (0, drizzle_orm_1.sql) `${schema_1.CustomerTable.email} = ${email}`
    });
};
exports.getCustomerByEmailService = getCustomerByEmailService;
//login a customer
const customerLoginService = async (customer) => {
    const { email } = customer;
    return await db_1.default.query.CustomerTable.findFirst({
        columns: {
            customerID: true,
            firstName: true,
            lastName: true,
            email: true,
            password: true,
            role: true
            //password:true
        },
        where: (0, drizzle_orm_1.sql) `${schema_1.CustomerTable.email} = ${email}`
    });
};
exports.customerLoginService = customerLoginService;
//Get all customers 
const getAll = async () => {
    const customers = await db_1.default.query.CustomerTable.findMany();
    return customers;
};
exports.getAll = getAll;
// //delete a Customer 
const remove = async (id) => {
    await db_1.default.delete(schema_1.CustomerTable).where((0, drizzle_orm_1.eq)(schema_1.CustomerTable.customerID, id));
    return "Customer deleted successfully";
};
exports.remove = remove;
//get Customer By ID 
const getById = async (id) => {
    const customer = await db_1.default.query.CustomerTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.CustomerTable.customerID, id)
    });
    return customer;
};
exports.getById = getById;
const verifyCustomerService = async (email) => {
    await db_1.default.update(schema_1.CustomerTable)
        .set({ isVerified: true, verificationCode: null })
        .where((0, drizzle_orm_1.sql) `${schema_1.CustomerTable.email} = ${email}`);
};
exports.verifyCustomerService = verifyCustomerService;
const getCustomerWithReservations = async (customerID) => {
    return await db_1.default.query.CustomerTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.CustomerTable.customerID, customerID),
        with: {
            reservations: true
        }
    });
};
exports.getCustomerWithReservations = getCustomerWithReservations;
const getCustomerWithBookings = async (customerID) => {
    return await db_1.default.query.CustomerTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.CustomerTable.customerID, customerID),
        with: {
            bookings: true
        }
    });
};
exports.getCustomerWithBookings = getCustomerWithBookings;
function update(arg0, body) {
    throw new Error('Function not implemented.');
}
const create = async (customer) => {
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    await db_1.default.insert(schema_1.CustomerTable).values({
        ...customer,
        isVerified: false,
        verificationCode,
    });
    return verificationCode;
};
exports.create = create;
