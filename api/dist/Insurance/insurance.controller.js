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
exports.deleteInsurance = exports.updateInsurance = exports.createInsurance = exports.getInsuranceById = exports.getAllInsurance = void 0;
const insuranceService = __importStar(require("./insurance.service"));
// Get all insurance records
const getAllInsurance = async (req, res) => {
    try {
        const records = await insuranceService.getAll();
        res.json(records);
    }
    catch {
        res.status(500).json({ error: "Failed to fetch insurance records" });
    }
};
exports.getAllInsurance = getAllInsurance;
// Get one insurance record by ID
const getInsuranceById = async (req, res) => {
    try {
        const record = await insuranceService.getById(Number(req.params.id));
        res.json(record);
    }
    catch {
        res.status(500).json({ error: "Insurance record not found" });
    }
};
exports.getInsuranceById = getInsuranceById;
// Create new insurance record
const createInsurance = async (req, res) => {
    try {
        const newRecord = await insuranceService.create(req.body);
        res.status(201).json(newRecord);
    }
    catch {
        res.status(500).json({ error: "Failed to create insurance record" });
    }
};
exports.createInsurance = createInsurance;
// Update insurance record
const updateInsurance = async (req, res) => {
    try {
        const updated = await insuranceService.update(Number(req.params.id), req.body);
        res.json(updated);
    }
    catch {
        res.status(500).json({ error: "Failed to update insurance record" });
    }
};
exports.updateInsurance = updateInsurance;
// Delete insurance record
const deleteInsurance = async (req, res) => {
    try {
        await insuranceService.remove(Number(req.params.id), req.body); // ✅ Added second argument
        res.json({ message: "Insurance record deleted" });
    }
    catch {
        res.status(500).json({ error: "Failed to delete insurance record" });
    }
};
exports.deleteInsurance = deleteInsurance;
