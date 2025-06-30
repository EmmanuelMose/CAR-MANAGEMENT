import { Router } from 'express';
import * as controller from './booking.controller';

const router = Router();

router.get('/', controller.getAllBookings);
router.get('/:id', controller.getBookingById);
router.post('/', controller.createBooking);
router.put('/:id', controller.updateBooking);
router.delete('/:id', controller.deleteBooking);


export default router;
