"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserController = exports.verifyUserController = exports.registerUserController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_service_1 = require("./auth.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = require("../mailer");
// REGISTER USER
const registerUserController = async (req, res) => {
    try {
        const user = req.body;
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(user.password, 10);
        user.password = hashedPassword;
        // Generate verification code and flags
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationCode = verificationCode;
        user.isVerified = false;
        // Save to DB
        const createUser = await (0, auth_service_1.createUserService)(user);
        if (!createUser)
            return res.status(400).json({ message: "User not created" });
        // Send verification email
        await (0, mailer_1.sendEmail)(user.email, "Verify your account", `Hello ${user.lastName}, your verification code is: ${verificationCode}`, `<div>
                <h2>Hello ${user.lastName},</h2>
                <p>Your verification code is: <strong>${verificationCode}</strong></p>
                <p>Please use this code to verify your account.</p>
            </div>`);
        return res.status(201).json({ message: "User registered successfully. Verification code sent to email." });
    }
    catch (error) {
        console.error("Register Error:", error.message);
        return res.status(500).json({ error: error.message });
    }
};
exports.registerUserController = registerUserController;
// verify user controller
const verifyUserController = async (req, res) => {
    const { email, verificationCode } = req.body;
    try {
        const user = await (0, auth_service_1.getUserByEmailService)(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.verificationCode !== verificationCode) {
            return res.status(400).json({ message: "Invalid verification code" });
        }
        await (0, auth_service_1.verifyUserService)(email);
        // Send verification success email
        try {
            await (0, mailer_1.sendEmail)(user.email, "Account Verified Successfully", `Hello ${user.lastName}, your account has been verified.`, `<div>
                    <h2>Hello ${user.lastName},</h2>
                    <p>Your account has been <strong>successfully verified</strong>.</p>
                </div>`);
        }
        catch (emailError) {
            console.error("Verification success email failed:", emailError);
        }
        return res.status(200).json({ message: "User verified successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.verifyUserController = verifyUserController;
//login user controller
const loginUserController = async (req, res) => {
    try {
        const user = req.body;
        // check if user exists
        const userExist = await (0, auth_service_1.userLoginService)(user);
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }
        // verify password
        const userMatch = await bcryptjs_1.default.compareSync(user.password, userExist.password);
        if (!userMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // create a payload for the JWT
        const payload = {
            customerID: userExist.customerID, //sub means subject, which is the user ID - it helps identify the user
            firstName: userExist.firstName,
            lastName: userExist.lastName,
            email: userExist.email,
            role: userExist.role, // role of the user
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3 // 3 days expiration
        };
        // Generate JWT token
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
        }
        const token = jsonwebtoken_1.default.sign(payload, secret);
        // Return the token and user information
        return res.status(200).json({
            message: "Login Successfull",
            token,
            user: {
                customerID: userExist.customerID,
                first_name: userExist.firstName,
                last_name: userExist.lastName,
                email: userExist.email,
                role: userExist.role,
            }
        });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.loginUserController = loginUserController;
function sendMail(email, arg1, arg2, arg3) {
    throw new Error('Function not implemented.');
}
