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
exports.deleteMaintenance = exports.updateMaintenance = exports.createMaintenance = exports.getMaintenanceById = exports.getAllMaintenance = void 0;
const maintenanceService = __importStar(require("./maintenance.service"));
// Get all maintenance records
const getAllMaintenance = async (req, res) => {
    try {
        const records = await maintenanceService.getAll();
        res.json(records);
    }
    catch {
        res.status(500).json({ error: "Failed to fetch maintenance records" });
    }
};
exports.getAllMaintenance = getAllMaintenance;
// Get a single maintenance record
const getMaintenanceById = async (req, res) => {
    try {
        const record = await maintenanceService.getById(Number(req.params.id));
        res.json(record);
    }
    catch {
        res.status(500).json({ error: "Maintenance record not found" });
    }
};
exports.getMaintenanceById = getMaintenanceById;
// Create a new maintenance record
const createMaintenance = async (req, res) => {
    try {
        const newRecord = await maintenanceService.create(req.body);
        res.status(201).json(newRecord);
    }
    catch {
        res.status(500).json({ error: "Failed to create maintenance record" });
    }
};
exports.createMaintenance = createMaintenance;
// Update an existing maintenance record
const updateMaintenance = async (req, res) => {
    try {
        const updated = await maintenanceService.update(Number(req.params.id), req.body);
        res.json(updated);
    }
    catch {
        res.status(500).json({ error: "Failed to update maintenance record" });
    }
};
exports.updateMaintenance = updateMaintenance;
// Delete a maintenance record
const deleteMaintenance = async (req, res) => {
    try {
        await maintenanceService.remove(Number(req.params.id));
        res.json({ message: "Maintenance record deleted" });
    }
    catch {
        res.status(500).json({ error: "Failed to delete maintenance record" });
    }
};
exports.deleteMaintenance = deleteMaintenance;
