import { Request, Response } from 'express';
import * as customerService from './customer.service';

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
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const newCustomer = await customerService.create(req.body);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: "Failed to create customer" });
  }
};

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