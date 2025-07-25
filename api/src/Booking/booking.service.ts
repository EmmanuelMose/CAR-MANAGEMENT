import db from '../Drizzle/db';
import { BookingsTable, TIBooking } from '../Drizzle/schema';
import { eq } from 'drizzle-orm';

// Get all bookings
export const getAll = async () => {
  const bookings = await db.query.BookingsTable.findMany();
  return bookings;
};

// Get booking by ID
export const getById = async (id: number) => {
  const booking = await db.query.BookingsTable.findFirst({
    where: eq(BookingsTable.bookingID, id),
  });
  return booking;
};

// Create booking
export const create = async (data: any) => {
  const result = await db.insert(BookingsTable).values(data).returning();
  return result[0];
};

// Update booking by ID
export const update = async (id: number, booking: TIBooking) => {
  await db.update(BookingsTable).set(booking).where(eq(BookingsTable.bookingID, id));
  return {
    bookingID: id,
    ...booking,
  };
};

// Delete booking by ID
export const remove = async (id: number) => {
  const result = await db.delete(BookingsTable).where(eq(BookingsTable.bookingID, id)).returning();
  return result.length > 0; // true if deleted, false if not found
};
