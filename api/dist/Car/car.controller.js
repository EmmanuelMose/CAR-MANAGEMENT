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
exports.getCarsWithBookingStats = exports.getAllCarsWithLocation = exports.deleteCar = exports.updateCar = exports.createCar = exports.getCarById = exports.getAllCars = void 0;
const carService = __importStar(require("./car.service"));
const car_service_1 = require("./car.service");
// Get all cars
const getAllCars = async (req, res) => {
    try {
        const cars = await (0, car_service_1.getAll)();
        if (!cars) {
            res.status(400).json({ message: "no cars" });
        }
        res.status(200).json({ message: "succes", cars });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch cars" });
        console.error("error fwetchh", error);
    }
};
exports.getAllCars = getAllCars;
// Get a single car by ID
const getCarById = async (req, res) => {
    try {
        const car = await carService.getById(Number(req.params.id));
        res.json(car);
    }
    catch (error) {
        res.status(500).json({ error: "Car not found" });
    }
};
exports.getCarById = getCarById;
// Create a new car
const createCar = async (req, res) => {
    try {
        const newCar = await carService.createCarService(req.body);
        res.status(201).json(newCar);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create car" });
        return;
    }
};
exports.createCar = createCar;
// Update an existing car
const updateCar = async (req, res) => {
    try {
        const updatedCar = await carService.update(Number(req.params.id), req.body);
        res.json(updatedCar);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update car" });
    }
};
exports.updateCar = updateCar;
// Delete a car
const deleteCar = async (req, res) => {
    try {
        await carService.remove(Number(req.params.id));
        res.json({ message: "Car deleted" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete car" });
    }
};
exports.deleteCar = deleteCar;
// Get all cars with their location details
const getAllCarsWithLocation = async (req, res) => {
    try {
        const cars = await carService.getAllCarsWithLocation();
        res.json(cars);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch cars with location details" });
    }
};
exports.getAllCarsWithLocation = getAllCarsWithLocation;
// Get cars with booking statistics
const getCarsWithBookingStats = async (req, res) => {
    try {
        const stats = await carService.getCarsWithBookingStats();
        res.json(stats);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch car booking statistics" });
    }
};
exports.getCarsWithBookingStats = getCarsWithBookingStats;
