import { Router } from 'express';
import * as controller from './location.controller';

const router = Router();

router.get('/', controller.getAllLocations);
router.get('/:id', controller.getLocationById);
router.post('/', controller.createLocation);
router.put('/:id', controller.updateLocation);
router.delete('/:id', controller.deleteLocation);
router.get('/with-assigned-cars', controller.getLocationsWithAssignedCarsController);

export default router;
