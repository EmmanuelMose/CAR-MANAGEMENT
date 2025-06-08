import express from 'express';


import carRoutes from './Car/car.router';
import customerRoutes from './Customer/customer.router';
import locationRoutes from './Location/location.router';
import reservationRoutes from './Reservation/reservation.router';
import bookingRoutes from './Booking/booking.router';
import paymentRoutes from './Payment/payment.router';
import maintenanceRoutes from './Maintenance/maintenance.router';
import insuranceRoutes from './Insurance/insurance.router';
import user from './auth/auth.router';
import router from './Car/car.router';
  

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON bodies
//Routes'
user(app)
app.use('/api/cars', carRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/insurance', insuranceRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

