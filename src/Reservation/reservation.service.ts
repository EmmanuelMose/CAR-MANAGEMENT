import  db from '../Drizzle/db';
import { CarTable, CustomerTable, ReservationTable, TIReservation } from '../Drizzle/schema';
import { eq } from 'drizzle-orm';


// Get all reservations
export const getAll = async () => {
    const reservations = await db.query.ReservationTable.findMany();
    return reservations;
    }


    // Get reservation by ID
    export const getById=async (id:number) => {
        const reservation=await db.query.ReservationTable.findFirst({
            where:eq(ReservationTable.reservationID,id)
        })
        return reservation
    
    }

// Create a new reservation
export const create = async (reservation: TIReservation) => {
  const [inserted] = await db.insert(ReservationTable).values(reservation).returning();
  if (inserted) {
    return inserted;
  }
  return null;
}
// Update a reservation
export const update = async (id: number, data: any) => {
  const result = await db
    .update(ReservationTable)
    .set(data)
    .where(eq(ReservationTable.reservationID, id))
    .returning();
  return result[0];
};

//delete reservation by ID
    export const remove=async (id:number)=> {
        await db.delete(ReservationTable).where(eq(ReservationTable.reservationID, id));
        return "Reservation deleted successfully";
    }
