"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const db_1 = __importDefault(require("../Drizzle/db"));
const schema_1 = require("../Drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
// Get all maintenance records
const getAll = async () => {
    const maintenances = await db_1.default.query.MaintenanceTable.findMany();
    return maintenances;
};
exports.getAll = getAll;
// Get maintenance record by ID
const getById = async (id) => {
    const maintenance = await db_1.default.query.MaintenanceTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.MaintenanceTable.maintenanceID, id)
    });
    return maintenance;
};
exports.getById = getById;
// Create a new maintenance record
const create = async (maintenance) => {
    const [inserted] = await db_1.default.insert(schema_1.MaintenanceTable).values(maintenance).returning();
    if (inserted) {
        return inserted;
    }
    return null;
};
exports.create = create;
// Update maintenance record by ID
const update = async (MaintenanceId, maintenance) => {
    await db_1.default.update(schema_1.MaintenanceTable).set(maintenance).where((0, drizzle_orm_1.eq)(schema_1.MaintenanceTable.maintenanceID, MaintenanceId));
    return "Maintenance updated successfully";
};
exports.update = update;
// Delete maintenance record by ID
const remove = async (maintenanceID) => {
    await db_1.default
        .delete(schema_1.MaintenanceTable)
        .where((0, drizzle_orm_1.eq)(schema_1.MaintenanceTable.maintenanceID, maintenanceID));
    return "Maintenance record deleted successfully";
};
exports.remove = remove;
