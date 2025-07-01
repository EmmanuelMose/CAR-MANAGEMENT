"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomer = exports.deleteCustomer = exports.updateCustomer = exports.getCustomerById = exports.getAllCustomers = exports.getCustomerWithBookingsController = exports.getCustomerWithReservationsController = void 0;
const customerService = __importStar(require("./customer.service"));
const customer_service_1 = require("./customer.service");
const mailer_1 = require("../mailer");
const getCustomerWithReservationsController = async (req, res) => {
    try {
        const customerID = parseInt(req.params.id);
        if (isNaN(customerID)) {
            return res.status(400).json({ error: "Invalid customer ID" });
        }
        const customer = await (0, customer_service_1.getCustomerWithReservations)(customerID);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found or no reservations available." });
        }
        return res.status(200).json({ data: customer });
    }
    catch (error) {
        console.error("Error in getCustomerWithReservationsController:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getCustomerWithReservationsController = getCustomerWithReservationsController;
const getCustomerWithBookingsController = async (req, res) => {
    try {
        const customerID = parseInt(req.params.id);
        if (isNaN(customerID)) {
            return res.status(400).json({ error: "Invalid customer ID" });
        }
        const customer = await (0, customer_service_1.getCustomerWithBookings)(customerID);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found or no bookings available." });
        }
        return res.status(200).json({ data: customer });
    }
    catch (error) {
        console.error("Error in getBookingWithReservationsController:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getCustomerWithBookingsController = getCustomerWithBookingsController;
// GET all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await customerService.getAll();
        res.json(customers);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch customers" });
    }
};
exports.getAllCustomers = getAllCustomers;
// GET a customer by ID
const getCustomerById = async (req, res) => {
    try {
        const customer = await customerService.getById(Number(req.params.id));
        res.json(customer);
    }
    catch (error) {
        res.status(500).json({ error: "Customer not found" });
    }
};
exports.getCustomerById = getCustomerById;
// CREATE a new customer
// (Removed duplicate createCustomer function to resolve redeclaration error)
// UPDATE a customer
const updateCustomer = async (req, res) => {
    try {
        const updated = await customerService.update(Number(req.params.id), req.body);
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update customer" });
    }
};
exports.updateCustomer = updateCustomer;
// DELETE a customer
const deleteCustomer = async (req, res) => {
    try {
        await customerService.remove(Number(req.params.id));
        res.json({ message: "Customer deleted" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete customer" });
    }
};
exports.deleteCustomer = deleteCustomer;
const createCustomer = async (req, res) => {
    try {
        const verificationCode = await customerService.create(req.body);
        const subject = 'Verify Your Email';
        const message = `Your verification code is: ${verificationCode}`;
        const html = `<p>Your verification code is: <b>${verificationCode}</b></p>`;
        const emailStatus = await (0, mailer_1.sendEmail)(req.body.email, subject, message, html);
        res.status(201).json({ message: 'Customer created. Verification email sent.', emailStatus });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create customer' });
    }
};
exports.createCustomer = createCustomer;
