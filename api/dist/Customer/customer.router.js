"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/customer.router.ts
const express_1 = __importDefault(require("express"));
const bearAuth_1 = require("../middleware/bearAuth");
const customer_controller_1 = require("./customer.controller");
const customer_controller_2 = require("./customer.controller");
const router = express_1.default.Router();
router.get('/', customer_controller_2.getAllCustomers, bearAuth_1.adminRoleAuth);
router.get('/:id', customer_controller_2.getCustomerById, bearAuth_1.userRoleAuth);
router.post('/', customer_controller_2.createCustomer, bearAuth_1.bothRoleAuth);
router.put('/:id', customer_controller_2.updateCustomer, bearAuth_1.adminRoleAuth);
router.delete('/:id', customer_controller_2.deleteCustomer, bearAuth_1.adminRoleAuth);
router.route("/reservation/:id").get(async (req, res, next) => {
    try {
        await (0, customer_controller_1.getCustomerWithBookingsController)(req, res);
    }
    catch (error) {
        next(error);
    }
});
//Get customer with booking ID
router.route("/booking/:id").get(async (req, res, next) => {
    try {
        await (0, customer_controller_1.getCustomerWithBookingsController)(req, res);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
