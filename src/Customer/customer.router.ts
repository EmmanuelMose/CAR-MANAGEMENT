// src/routes/customer.router.ts
import express from 'express';
import { adminRoleAuth, bothRoleAuth, checkRoles, userRoleAuth } from '../middleware/bearAuth';
import { getCustomerWithBookingsController } from './customer.controller';
import { getCustomerWithReservationsController } from './customer.controller';

import { 
    getAllCustomers, 
    getCustomerById, 
    createCustomer, 
    updateCustomer, 
    deleteCustomer, 
    
} from './customer.controller';

const router = express.Router();

router.get('/', getAllCustomers, adminRoleAuth);
router.get('/:id', getCustomerById ,userRoleAuth);
router.post('/', createCustomer , bothRoleAuth);
router.put('/:id', updateCustomer,adminRoleAuth);
router.delete('/:id', deleteCustomer,adminRoleAuth);



router.route("/customer/reservation/:id").get(
    async (req, res, next) => {

        try{

            
            await getCustomerWithBookingsController(req, res);

        }

        catch (error) {     
            next(error);
        }
    }
)



//Get customer with booking ID
router.route("/customer/booking/:id").get(
    async (req, res, next) => {

        try{
            await getCustomerWithBookingsController(req, res);

        }

        catch (error) {     
            next(error);
        }
    }
)





export default router;