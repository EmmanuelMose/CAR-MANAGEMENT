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
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBookingById = exports.getAllBookings = void 0;
const bookingService = __importStar(require("./booking.service"));
// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAll();
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
};
exports.getAllBookings = getAllBookings;
// Get booking by ID
const getBookingById = async (req, res) => {
    try {
        const booking = await bookingService.getById(Number(req.params.id));
        res.json(booking);
    }
    catch (error) {
        res.status(500).json({ error: "Booking not found" });
    }
};
exports.getBookingById = getBookingById;
const createBooking = async (req, res) => {
    try {
        const newBooking = await bookingService.create(req.body);
        res.status(201).json(newBooking);
    }
    catch (error) {
        console.error("Create Booking Error:", error);
        res.status(500).json({ error: error.message || "Failed to create booking" });
    }
};
exports.createBooking = createBooking;
// Update a booking
const updateBooking = async (req, res) => {
    try {
        const updatedBooking = await bookingService.update(Number(req.params.id), req.body);
        res.json(updatedBooking);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update booking" });
    }
};
exports.updateBooking = updateBooking;
// ✅ Corrected deleteBooking function
const deleteBooking = async (req, res) => {
    try {
        const deleted = await bookingService.remove(Number(req.params.id));
        if (deleted) {
            res.status(200).json({ message: "Booking deleted successfully" });
        }
        else {
            res.status(404).json({ message: "Booking not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete booking" });
    }
};
exports.deleteBooking = deleteBooking;
