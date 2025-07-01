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
exports.deleteReservation = exports.updateReservation = exports.createReservation = exports.getReservationById = exports.getAllReservations = void 0;
const reservationService = __importStar(require("./reservation.service"));
// Get all reservations
const getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationService.getAll();
        res.json(reservations);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch reservations" });
    }
};
exports.getAllReservations = getAllReservations;
// Get a single reservation by ID
const getReservationById = async (req, res) => {
    try {
        const reservation = await reservationService.getById(Number(req.params.id));
        res.json(reservation);
    }
    catch (error) {
        res.status(500).json({ error: "Reservation not found" });
    }
};
exports.getReservationById = getReservationById;
// Create a new reservation
const createReservation = async (req, res) => {
    try {
        const newReservation = await reservationService.create(req.body);
        res.status(201).json(newReservation);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create reservation" });
    }
};
exports.createReservation = createReservation;
// Update a reservation
const updateReservation = async (req, res) => {
    try {
        const updatedReservation = await reservationService.update(Number(req.params.id), req.body);
        res.json(updatedReservation);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update reservation" });
    }
};
exports.updateReservation = updateReservation;
// Delete a reservation
const deleteReservation = async (req, res) => {
    try {
        await reservationService.remove(Number(req.params.id));
        res.json({ message: "Reservation deleted" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete reservation" });
    }
};
exports.deleteReservation = deleteReservation;
