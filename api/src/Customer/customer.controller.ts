import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import * as customerService from './customer.service';
import jwt from 'jsonwebtoken';
import {getCustomerWithBookings, getCustomerWithReservations}  from "./customer.service";
import { sendEmail } from '../mailer';




export const getCustomerWithReservationsController = async (req: Request, res: Response) => {
  try {
    const customerID = parseInt(req.params.id);

    if (isNaN(customerID)) {
      return res.status(400).json({ error: "Invalid customer ID" });
    }

    const customer: any = await getCustomerWithReservations(customerID);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found or no reservations available." });
    }

    return res.status(200).json({ data: customer });
  } catch (error) {
    console.error("Error in getCustomerWithReservationsController:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};







export const getCustomerWithBookingsController = async (req: Request, res: Response) => {
  try {
    const customerID = parseInt(req.params.id);

    if (isNaN(customerID)) {
      return res.status(400).json({ error: "Invalid customer ID" });
    }

    const customer: any = await getCustomerWithBookings(customerID);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found or no bookings available." });
    }

    return res.status(200).json({ data: customer });
  } catch (error) {
    console.error("Error in getBookingWithReservationsController:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};







// GET all customers
export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await customerService.getAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};

// GET a customer by ID
export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.getById(Number(req.params.id));
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "Customer not found" });
  }
};

// CREATE a new customer
// (Removed duplicate createCustomer function to resolve redeclaration error)

// UPDATE a customer
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const updated = await customerService.update(Number(req.params.id), req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update customer" });
  }
};

// DELETE a customer
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    await customerService.remove(Number(req.params.id));
    res.json({ message: "Customer deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete customer" });
  }
};


export const createCustomer = async (req: Request, res: Response) => {
  try {
    const verificationCode = await customerService.create(req.body);

    const subject = 'Verify Your Email';
    const message = `Your verification code is: ${verificationCode}`;
    const html = `<p>Your verification code is: <b>${verificationCode}</b></p>`;

    const emailStatus = await sendEmail(req.body.email, subject, message, html);

    res.status(201).json({ message: 'Customer created. Verification email sent.', emailStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create customer' });
  }
};
