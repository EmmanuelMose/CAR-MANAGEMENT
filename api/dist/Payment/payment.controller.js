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
exports.handleGetPaymentsWithBooking = exports.deletePayment = exports.updatePayment = exports.createPayment = exports.getPaymentById = exports.getAllPayments = void 0;
const paymentService = __importStar(require("./payment.service"));
// Get all payments
const getAllPayments = async (req, res) => {
    try {
        const payments = await paymentService.getAll();
        res.json(payments);
    }
    catch {
        res.status(500).json({ error: "Failed to fetch payments" });
    }
};
exports.getAllPayments = getAllPayments;
// Get payment by ID
const getPaymentById = async (req, res) => {
    try {
        const payment = await paymentService.getById(Number(req.params.id));
        res.json(payment);
    }
    catch {
        res.status(500).json({ error: "Payment not found" });
    }
};
exports.getPaymentById = getPaymentById;
// Create new payment
const createPayment = async (req, res) => {
    try {
        const newPayment = await paymentService.create(req.body);
        res.status(201).json(newPayment);
    }
    catch {
        res.status(500).json({ error: "Failed to create payment" });
    }
};
exports.createPayment = createPayment;
// Update a payment
const updatePayment = async (req, res) => {
    try {
        const updatedPayment = await paymentService.update(Number(req.params.id), req.body);
        res.json(updatedPayment);
    }
    catch {
        res.status(500).json({ error: "Failed to update payment" });
    }
};
exports.updatePayment = updatePayment;
// Delete a payment
const deletePayment = async (req, res) => {
    try {
        await paymentService.remove(Number(req.params.id));
        res.json({ message: "Payment deleted" });
    }
    catch {
        res.status(500).json({ error: "Failed to delete payment" });
    }
};
exports.deletePayment = deletePayment;
const handleGetPaymentsWithBooking = async (_req, res) => {
    try {
        const result = await paymentService.getPaymentsWithBooking();
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch payments with booking.' });
    }
};
exports.handleGetPaymentsWithBooking = handleGetPaymentsWithBooking;
