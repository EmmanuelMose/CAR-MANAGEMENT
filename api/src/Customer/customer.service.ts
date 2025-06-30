import db from '../Drizzle/db';
import { BookingsTable, CustomerTable, ReservationTable, TICustomer } from '../Drizzle/schema';
import { eq, sql } from 'drizzle-orm';
import crypto from 'crypto';

//create a new customer
// (removed duplicate declaration)


//get customer by email
export const getCustomerByEmailService = async (email: string) => {
    return await db.query.CustomerTable.findFirst({
        where: sql`${CustomerTable.email} = ${email}`
    });
}






//login a customer
export const customerLoginService = async (customer: TICustomer) => {

    const { email } = customer;
    return await db.query.CustomerTable.findFirst({
        columns: {
            customerID: true,
            firstName: true,
            lastName: true,
            email: true,
            password: true,
            role:true
            
            //password:true
        },
        where: sql`${CustomerTable.email} = ${email}`
    });


}


//Get all customers 
export const getAll = async () => {
const customers = await db.query.CustomerTable.findMany();
return customers;


}





// //delete a Customer 
export const remove= async (id:number)=> {
await db.delete(CustomerTable).where(eq(CustomerTable.customerID,id));
 return "Customer deleted successfully"


 }

//get Customer By ID 
export const getById= async (id:number)=> {
const customer=await db.query.CustomerTable.findFirst({
    where: eq(CustomerTable.customerID,id)
})

return customer


}
export const verifyCustomerService = async (email: string) => { 
await db.update (CustomerTable)
.set({ isVerified: true, verificationCode:null})
.where(sql`${CustomerTable.email} = ${email}`);


}









export const getCustomerWithReservations = async (customerID: number) => {
    return await db.query.CustomerTable.findFirst({
        where: eq(CustomerTable.customerID, customerID),
        with: {
            reservations: true
        }
    })
}



export const getCustomerWithBookings= async (customerID: number) => {

return await db.query.CustomerTable.findFirst({
where:eq(CustomerTable.customerID, customerID),
with: {
            bookings: true
        }
    })
}



export function update(arg0: number, body: any) {
  throw new Error('Function not implemented.');
}


export const create = async (customer: TICustomer) => {
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code

  await db.insert(CustomerTable).values({
    ...customer,
    isVerified: false,
    verificationCode,
  });

  return verificationCode;
};