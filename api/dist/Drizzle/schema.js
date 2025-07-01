"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsuranceRelations = exports.MaintenanceRelations = exports.PaymentRelations = exports.BookingsRelations = exports.ReservationRelations = exports.CarRelations = exports.LocationRelationships = exports.CustomerRelations = exports.InsuranceTable = exports.MaintenanceTable = exports.PaymentTable = exports.BookingsTable = exports.ReservationTable = exports.CarTable = exports.LocationTable = exports.CustomerTable = exports.RoleEnum = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
exports.RoleEnum = (0, pg_core_1.pgEnum)("role", ["admin", "user"]);
exports.CustomerTable = (0, pg_core_2.pgTable)("customer", {
    customerID: (0, pg_core_2.serial)("customerID").primaryKey(),
    firstName: (0, pg_core_2.varchar)("FirstName", { length: 50 }),
    lastName: (0, pg_core_2.varchar)("LastName", { length: 50 }),
    email: (0, pg_core_2.varchar)("Email", { length: 100 }).notNull().unique(),
    phoneNumber: (0, pg_core_2.text)("PhoneNumber"),
    password: (0, pg_core_2.varchar)("Password", { length: 255 }).notNull(),
    address: (0, pg_core_2.varchar)("Address", { length: 255 }),
    isVerified: (0, pg_core_2.boolean)("is_verified").default(false),
    verificationCode: (0, pg_core_2.varchar)("VerificationCode", { length: 50 }),
    role: (0, exports.RoleEnum)("Role").default("user")
});
// Location Table
exports.LocationTable = (0, pg_core_2.pgTable)("location", {
    locationID: (0, pg_core_2.serial)("LocationID").primaryKey(),
    locationName: (0, pg_core_2.varchar)("LocationName", { length: 100 }).notNull(),
    address: (0, pg_core_2.text)("Address").notNull(),
    contactNumber: (0, pg_core_2.varchar)("ContactNumber", { length: 20 })
});
exports.CarTable = (0, pg_core_2.pgTable)("car", {
    carID: (0, pg_core_2.serial)("carID").primaryKey(),
    carModel: (0, pg_core_2.varchar)("carModel", { length: 100 }).notNull(),
    year: (0, pg_core_2.varchar)("year", { length: 255 }).notNull(), // or date() if needed
    color: (0, pg_core_2.varchar)("color", { length: 50 }).notNull(),
    rentalRate: (0, pg_core_2.decimal)("rentalRate", { precision: 10, scale: 2 }).notNull(),
    availability: (0, pg_core_2.boolean)("availability").default(true).notNull(),
    locationID: (0, pg_core_2.integer)("locationID").notNull().references(() => exports.LocationTable.locationID),
});
// Reservation Table
exports.ReservationTable = (0, pg_core_2.pgTable)("reservation", {
    reservationID: (0, pg_core_2.serial)("ReservationID").primaryKey(),
    customerID: (0, pg_core_2.integer)("CustomerID").notNull().references(() => exports.CustomerTable.customerID, { onDelete: "cascade" }),
    carID: (0, pg_core_2.integer)("CarID").notNull().references(() => exports.CarTable.carID, { onDelete: "cascade" }),
    reservationDate: (0, pg_core_2.date)("ReservationDate").notNull(),
    pickupDate: (0, pg_core_2.date)("PickupDate").notNull(),
    returnDate: (0, pg_core_2.date)("ReturnDate")
});
//Booking Table
exports.BookingsTable = (0, pg_core_2.pgTable)("bookings", {
    bookingID: (0, pg_core_2.serial)("BookingID").primaryKey(),
    carID: (0, pg_core_2.integer)("CarID").notNull().references(() => exports.CarTable.carID, { onDelete: "cascade" }),
    customerID: (0, pg_core_2.integer)("CustomerID").notNull().references(() => exports.CustomerTable.customerID, { onDelete: "cascade" }),
    rentalStartDate: (0, pg_core_2.date)("RentalStartDate").notNull(),
    rentalEndDate: (0, pg_core_2.date)("RentalEndDate").notNull(),
    totalAmount: (0, pg_core_2.decimal)("TotalAmount", { precision: 10, scale: 2 })
});
// Payment Table
exports.PaymentTable = (0, pg_core_2.pgTable)("payment", {
    paymentID: (0, pg_core_2.serial)("PaymentID").primaryKey(),
    bookingID: (0, pg_core_2.integer)("BookingID").notNull().references(() => exports.BookingsTable.bookingID, { onDelete: "cascade" }),
    paymentDate: (0, pg_core_2.date)("PaymentDate").notNull(),
    amount: (0, pg_core_2.decimal)("Amount", { precision: 10, scale: 2 }).notNull(), // {precision: 10, scale: 2} means 10 digits total, 2 of which are after the decimal point. i.e // 12345678.90
    paymentMethod: (0, pg_core_2.text)("PaymentMethod")
});
// Maintenance Table
//
exports.MaintenanceTable = (0, pg_core_2.pgTable)("maintenance", {
    maintenanceID: (0, pg_core_2.serial)("MaintenanceID").primaryKey(),
    carID: (0, pg_core_2.integer)("CarID").notNull().references(() => exports.CarTable.carID, { onDelete: "cascade" }),
    maintenanceDate: (0, pg_core_2.date)("MaintenanceDate").notNull(),
    description: (0, pg_core_2.varchar)("Description", { length: 255 }),
    cost: (0, pg_core_2.decimal)("Cost", { precision: 10, scale: 2 })
});
// Insurance Table
exports.InsuranceTable = (0, pg_core_2.pgTable)("insurance", {
    insuranceID: (0, pg_core_2.serial)("InsuranceID").primaryKey(),
    carID: (0, pg_core_2.integer)("CarID").notNull().references(() => exports.CarTable.carID, { onDelete: "cascade" }),
    insuranceProvider: (0, pg_core_2.varchar)("InsuranceProvider", { length: 100 }).notNull(),
    policyNumber: (0, pg_core_2.varchar)("PolicyNumber").notNull(),
    startDate: (0, pg_core_2.date)("StartDate").notNull(),
    endDate: (0, pg_core_2.date)("EndDate")
});
// RELATIONSHIPS
// CustomerTable Relationships - 1 customer can have many reservations and bookings
exports.CustomerRelations = (0, drizzle_orm_1.relations)(exports.CustomerTable, ({ many }) => ({
    reservations: many(exports.ReservationTable),
    bookings: many(exports.BookingsTable)
}));
// LocationTable Relationships -  1 location can have many cars
exports.LocationRelationships = (0, drizzle_orm_1.relations)(exports.LocationTable, ({ many }) => ({
    cars: many(exports.CarTable)
}));
// CarTable Relationships - 1 car can have many reservations, bookings, maintenance, and insurance
exports.CarRelations = (0, drizzle_orm_1.relations)(exports.CarTable, ({ many, one }) => ({
    location: one(exports.LocationTable, {
        fields: [exports.CarTable.locationID],
        references: [exports.LocationTable.locationID]
    }),
    reservations: many(exports.ReservationTable),
    bookings: many(exports.BookingsTable),
    maintenanceRecords: many(exports.MaintenanceTable),
    insurancePolicies: many(exports.InsuranceTable)
}));
// ReservationTable Relationships - 1 reservation belongs to 1 customer and 1 car
exports.ReservationRelations = (0, drizzle_orm_1.relations)(exports.ReservationTable, ({ one }) => ({
    customer: one(exports.CustomerTable, {
        fields: [exports.ReservationTable.customerID],
        references: [exports.CustomerTable.customerID]
    }),
    car: one(exports.CarTable, {
        fields: [exports.ReservationTable.carID],
        references: [exports.CarTable.carID]
    })
}));
// BookingsTable Relationships - 1 booking belongs to 1 customer and 1 car, and can have many payments
exports.BookingsRelations = (0, drizzle_orm_1.relations)(exports.BookingsTable, ({ one, many }) => ({
    customer: one(exports.CustomerTable, {
        fields: [exports.BookingsTable.customerID],
        references: [exports.CustomerTable.customerID]
    }),
    car: one(exports.CarTable, {
        fields: [exports.BookingsTable.carID],
        references: [exports.CarTable.carID]
    }),
    payments: many(exports.PaymentTable)
}));
// PaymentTable Relationships - 1 payment belongs to 1 booking
exports.PaymentRelations = (0, drizzle_orm_1.relations)(exports.PaymentTable, ({ one }) => ({
    booking: one(exports.BookingsTable, {
        fields: [exports.PaymentTable.bookingID],
        references: [exports.BookingsTable.bookingID]
    })
}));
// MaintenanceTable Relationships - 1 maintenance record belongs to 1 car
exports.MaintenanceRelations = (0, drizzle_orm_1.relations)(exports.MaintenanceTable, ({ one }) => ({
    car: one(exports.CarTable, {
        fields: [exports.MaintenanceTable.carID],
        references: [exports.CarTable.carID]
    })
}));
// InsuranceTable Relationships - 1 insurance policy belongs to 1 car
exports.InsuranceRelations = (0, drizzle_orm_1.relations)(exports.InsuranceTable, ({ one }) => ({
    car: one(exports.CarTable, {
        fields: [exports.InsuranceTable.carID],
        references: [exports.CarTable.carID]
    })
}));
