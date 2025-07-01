"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginService = exports.verifyUserService = exports.getUserByEmailService = exports.createUserService = void 0;
const db_1 = __importDefault(require("../Drizzle/db"));
const schema_1 = require("../Drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const createUserService = async (user) => {
    return db_1.default.insert(schema_1.CustomerTable).values(user).returning().then(res => res[0]);
};
exports.createUserService = createUserService;
const getUserByEmailService = async (email) => {
    return db_1.default.query.CustomerTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.CustomerTable.email, email),
    });
};
exports.getUserByEmailService = getUserByEmailService;
const verifyUserService = async (email) => {
    return db_1.default.update(schema_1.CustomerTable)
        .set({ isVerified: true, verificationCode: null })
        .where((0, drizzle_orm_1.eq)(schema_1.CustomerTable.email, email));
};
exports.verifyUserService = verifyUserService;
const userLoginService = async ({ email }) => {
    return db_1.default.query.CustomerTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.CustomerTable.email, email),
    });
};
exports.userLoginService = userLoginService;
