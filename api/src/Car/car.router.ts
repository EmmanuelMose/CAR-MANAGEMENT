import { Express } from 'express';
import * as carController from './car.controller';

export const car = (app: Express) => {
  // Handle /cars routes
  app.route("/cars")
    .get(carController.getAllCars)
    .post(carController.createCar); // <-- Add POST

  // Handle /cars/:id routes
  app.route("/cars/:id")
    .get(carController.getCarById)     // Optional
    .put(carController.updateCar)      // <-- Add PUT
    .delete(carController.deleteCar);  // <-- Add DELETE
};
