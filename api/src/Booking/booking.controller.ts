import { Request, Response } from 'express';
import * as bookingService from './booking.service';

// Get all bookings
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await bookingService.getAll();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

// Get booking by ID
export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.getById(Number(req.params.id));
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: "Booking not found" });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const newBooking = await bookingService.create(req.body);
    res.status(201).json(newBooking);
  } catch (error: any) {
    console.error("Create Booking Error:", error);
    res.status(500).json({ error: error.message || "Failed to create booking" });
  }
};

// Update a booking
export const updateBooking = async (req: Request, res: Response) => {
  try {
    const updatedBooking = await bookingService.update(Number(req.params.id), req.body);
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: "Failed to update booking" });
  }
};

// ✅ Corrected deleteBooking function
export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const deleted = await bookingService.remove(Number(req.params.id));

    if (deleted) {
      res.status(200).json({ message: "Booking deleted successfully" });
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete booking" });
  }
};
