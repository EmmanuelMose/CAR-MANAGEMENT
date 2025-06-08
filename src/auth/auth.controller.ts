import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { createUserService, getUserByEmailService, userLoginService, verifyUserService} from './auth.service';
import jwt from 'jsonwebtoken';
import user from './auth.router';   
import { CustomerTable, TICustomer } from '../Drizzle/schema';
import { sendEmail } from '../mailer';


// create user controller
export const registerUserController = async (req: Request, res: Response) => {
    // console.log("Register request body:", req.body); // 🔍 Debug

    // if (!req.body || !req.body.password || !req.body.email || !req.body.lastName) {
    //     return res.status(400).json({ error: "Missing required fields: email, password, lastName" });
    // }
    console.log("usr",req.body)
  

    try {
        const user:TICustomer = req.body;

        // Hash password
        const password = user.password;
        const hashedPassword = await bcrypt.hashSync(password, 10);
        user.password = hashedPassword;

        // Add verification fields
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationCode = verificationCode;
        user.isVerified = false;

        // Save user to DB
        const createUser = await createUserService(user);
        if (!createUser) return res.status(404).json({ message: "User not created" });

        // Send verification email
        try {
            await sendEmail(
                user.email,
                "Verify your account",
                `Hello ${user.lastName}, your verification code is: ${verificationCode}`,
                `<div>
                    <h2>Hello ${user.lastName},</h2>
                    <p>Your verification code is: <strong>${verificationCode}</strong></p>
                    <p>Please use this code to verify your account.</p>
                </div>`
            );
        } catch (emailError: any) {
            console.error("Failed to send verification email:", emailError.message);
        }

        return res.status(201).json({ message: "User registered successfully. Verification code sent to email." });

    } catch (error: any) {
        console.error("Register Error:", error.message);
        return res.status(500).json({ error: error.message });
    }
};
// verify user controller
export const verifyUserController = async (req: Request, res: Response) => {
    const { email, verificationCode } = req.body;

    try {
        const user = await getUserByEmailService(email);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.verificationCode !== verificationCode) {
            return res.status(400).json({ message: "Invalid verification code" });
        }

        await verifyUserService(email);

        // Send verification success email
        try {
            await sendEmail(
                user.email,
                "Account Verified Successfully",
                `Hello ${user.lastName}, your account has been verified.`,
                `<div>
                    <h2>Hello ${user.lastName},</h2>
                    <p>Your account has been <strong>successfully verified</strong>.</p>
                </div>`
            );
        } catch (emailError) {
            console.error("Verification success email failed:", emailError);
        }

        return res.status(200).json({ message: "User verified successfully" });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};


//login user controller
export const loginUserController = async (req: Request, res: Response) => {
    try {
        const user = req.body;

        // check if user exists
        const userExist = await userLoginService(user);
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }

        // verify password
        const userMatch = await bcrypt.compareSync(user.password, userExist.password as string)
        if (!userMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // create a payload for the JWT
        const payload = {
            customerID: userExist.customerID, //sub means subject, which is the user ID - it helps identify the user
            firstName: userExist.firstName,
            lastName: userExist.lastName,
            email: userExist.email,
            role: userExist.role,// role of the user
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3 // 3 days expiration

        }

        // Generate JWT token
        const secret = process.env.JWT_SECRET as string;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
        }
        const token = jwt.sign(payload, secret);

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
        })

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

function sendMail(email: any, arg1: string, arg2: string, arg3: string) {
    throw new Error('Function not implemented.');
}

