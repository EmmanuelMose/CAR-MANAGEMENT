import db from '../Drizzle/db';
import { BookingsTable, PaymentTable, TIPayment } from '../Drizzle/schema';
import { eq } from 'drizzle-orm';


//Get all payments 
export const getAll = async () => {
const payments=await db.query.PaymentTable.findMany()
return payments;

}

// Get a payment by ID
export const getById = async (paymentId: number) => {
const payment=await db.query.PaymentTable.findFirst({
    where:eq(PaymentTable.paymentID, paymentId)
})
 return payment;
}
// Create a new payment
export const create = async (payment: TIPayment) => {
const [inserted]= await db.insert(PaymentTable).values(payment).returning();
if (inserted) {
    return inserted 
}

return null

}

// Update a payment
export const update = async (id: number, data: any) => {
  const result = await db
    .update(PaymentTable)
    .set(data)
    .where(eq(PaymentTable.paymentID, id))
    .returning();
  return result[0];
};
//update a payment by ID
export const updateById = async (paymentId: number, payment: TIPayment) => {
    await db.update(PaymentTable).set(payment).where(eq(PaymentTable.paymentID, paymentId));
    return "Payment updated successfully";

}

// Delete a payment by ID
export const remove = async (paymentId: number) => {
    await db.delete(PaymentTable).where(eq(PaymentTable.paymentID, paymentId)).returning()
    return "Payment deleted successfully";
}
// JOIN: payment + booking
export const getPaymentsWithBooking = async () => {
  return db
    .select()
    .from(PaymentTable)
    .innerJoin(BookingsTable as any, eq(PaymentTable.bookingID, BookingsTable.bookingID));
};