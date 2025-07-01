"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const car_router_1 = require("./Car/car.router");
const customer_router_1 = __importDefault(require("./Customer/customer.router"));
const location_router_1 = __importDefault(require("./Location/location.router"));
const reservation_router_1 = __importDefault(require("./Reservation/reservation.router"));
const booking_router_1 = __importDefault(require("./Booking/booking.router"));
const payment_router_1 = __importDefault(require("./Payment/payment.router"));
const maintenance_router_1 = __importDefault(require("./Maintenance/maintenance.router"));
const insurance_router_1 = __importDefault(require("./Insurance/insurance.router"));
const auth_router_1 = __importDefault(require("./auth/auth.router"));
//import { compareSync } from 'bcryptjs';
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
}));
(0, auth_router_1.default)(app);
(0, car_router_1.car)(app);
app.use('/api/customers', customer_router_1.default);
app.use('/api/locations', location_router_1.default);
app.use('/api/reservations', reservation_router_1.default);
app.use('/api/bookings', booking_router_1.default);
app.use('/api/payments', payment_router_1.default);
app.use('/api/maintenance', maintenance_router_1.default);
app.use('/api/insurance', insurance_router_1.default);
app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
});
