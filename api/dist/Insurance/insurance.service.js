"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../Drizzle/db"));
const schema_1 = require("../Drizzle/schema");
// Create a new insurance policy
const create = async (insurance) => {
    const [inserted] = await db_1.default.insert(schema_1.InsuranceTable).values(insurance).returning();
    if (inserted) {
        return inserted;
    }
    return null;
};
exports.create = create;
// Get all insurance policies
const getAll = async () => {
    const insurances = await db_1.default.query.InsuranceTable.findMany();
    return insurances;
};
exports.getAll = getAll;
// Get insurance by ID
const getById = async (id) => {
    const insurance = await db_1.default.query.InsuranceTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.InsuranceTable.insuranceID, id),
    });
    return insurance;
};
exports.getById = getById;
// Update insurance by ID
const update = async (id, insurance) => {
    await db_1.default.update(schema_1.InsuranceTable).set(insurance).where((0, drizzle_orm_1.eq)(schema_1.InsuranceTable.insuranceID, id));
    return "Insurance updated successfully";
};
exports.update = update;
//Removed unused second parameter
const remove = async (insuranceID, body) => {
    await db_1.default.delete(schema_1.InsuranceTable).where((0, drizzle_orm_1.eq)(schema_1.InsuranceTable.insuranceID, insuranceID));
    return "Insurance policy deleted successfully";
};
exports.remove = remove;
