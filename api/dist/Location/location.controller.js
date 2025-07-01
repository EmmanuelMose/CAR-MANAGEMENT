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
exports.getLocationsWithAssignedCarsController = exports.getAllLocationsWithCarsController = exports.deleteLocation = exports.updateLocation = exports.createLocation = exports.getLocationById = exports.getAllLocations = void 0;
const locationService = __importStar(require("./location.service"));
// Get all locations
const getAllLocations = async (req, res) => {
    try {
        const locations = await locationService.getAll();
        res.json(locations);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch locations" });
    }
};
exports.getAllLocations = getAllLocations;
// Get a single location by ID
const getLocationById = async (req, res) => {
    try {
        const location = await locationService.getById(Number(req.params.id));
        res.json(location);
    }
    catch (error) {
        res.status(500).json({ error: "Location not found" });
    }
};
exports.getLocationById = getLocationById;
// Create a new location
const createLocation = async (req, res) => {
    try {
        const newLocation = await locationService.create(req.body);
        res.status(201).json(newLocation);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create location" });
    }
};
exports.createLocation = createLocation;
// Update an existing location
const updateLocation = async (req, res) => {
    try {
        const updated = await locationService.update(Number(req.params.id), req.body);
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update location" });
    }
};
exports.updateLocation = updateLocation;
// Delete a location
const deleteLocation = async (req, res) => {
    try {
        await locationService.remove(Number(req.params.id));
        res.json({ message: "Location deleted" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete location" });
    }
};
exports.deleteLocation = deleteLocation;
const getAllLocationsWithCarsController = async (_req, res) => {
    try {
        const locations = await getAllLocationsWithCarsService();
        res.json(locations);
    }
    catch (error) {
        console.error("Error fetching locations with cars:", error);
        res.status(500).json({ message: "Failed to fetch locations with cars", error });
    }
};
exports.getAllLocationsWithCarsController = getAllLocationsWithCarsController;
const getLocationsWithAssignedCarsController = async (_req, res) => {
    try {
        const locations = await getAllLocationsWithCarsService();
        res.json(locations);
    }
    catch (error) {
        console.error("Error fetching assigned car locations:", error);
        res.status(500).json({ message: "Failed to fetch locations with assigned cars", error });
    }
};
exports.getLocationsWithAssignedCarsController = getLocationsWithAssignedCarsController;
function getAllLocationsWithCarsService() {
    throw new Error('Function not implemented.');
}
