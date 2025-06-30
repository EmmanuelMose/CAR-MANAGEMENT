// src/__tests__/integration/auth.controller.test.ts

import request from "supertest";
import express from "express";
import {
  registerUserController,
  loginUserController,
  verifyUserController,
} from "../../src/auth/auth.controller";
import * as AuthService from "../../src/auth/auth.service";

const app = express();
app.use(express.json());
app.post("/auth/register", registerUserController as any);
app.post("/auth/login", loginUserController as any);
app.post("/auth/verify", verifyUserController as any);

jest.mock("../../src/auth/auth.service");

beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

describe("Auth Controller - Integration Tests", () => {
  const mockUser = {
    customerID: 1,
    email: "muambukijoshua2@gmail.com",
    firstName: "Joshua",
    lastName: "Muambuki",
    password: "$2a$10$hashedpassword",
    isAdmin: false,
    verificationCode: "ABC123",
    isVerified: false,
    role: "user",
  };

  const mockToken = "mock.jwt.token";


  
  test("POST /auth/register should return 500 if an error occurs", async () => {
    (AuthService.createUserService as jest.Mock).mockRejectedValue(new Error("Failed to register user"));

    const response = await request(app).post("/auth/register").send({
      email: mockUser.email,
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      password: "12345678",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to register user" });
  });

  test("POST /auth/login should return 500 if an error occurs", async () => {
    (AuthService.userLoginService as jest.Mock).mockRejectedValue(new Error("Failed to login user"));

    const response = await request(app).post("/auth/login").send({
      email: mockUser.email,
      password: "12345678",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to login user" });
  });

  test("POST /auth/verify should return 500 if an error occurs", async () => {
    (AuthService.getUserByEmailService as jest.Mock).mockRejectedValue(new Error("Failed to verify user"));

    const response = await request(app).post("/auth/verify").send({
      email: mockUser.email,
      verificationCode: "ABC123",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to verify user" });
  });
});
