import { Router } from 'express';
import * as carController from './car.controller';

const router = Router();

router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);
router.post('/', carController.createCar);
router.put('/:id', carController.updateCar);
router.delete('/:id', carController.deleteCar);

// Get all cars with location details
router.get('/with-location/all', carController.getAllCarsWithLocation);
// Get cars with booking statistics
router.get('/stats/bookings', carController.getCarsWithBookingStats);

export default router;
