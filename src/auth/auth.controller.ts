import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { createUserService, getUserByEmailService, userLoginService, verifyUserService} from './auth.service';
import jwt from 'jsonwebtoken';
import user from './auth.router';   
import { CustomerTable } from '../Drizzle/schema';
import { sendEmail } from '../mailer';


// create user controller
export const registerUserController = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const password = user.password;
        const hashedPassword = await bcrypt.hashSync(password, 10);
        user.password = hashedPassword;

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit verification code
        user.verificationCode = verificationCode; // Add the verification code to the user object
        user.isVerified = false; // Set isVerified to false by default
        const createUser = await createUserService(user);
        if (!createUser) return res.json({ message: "User not created" })
            try {
                  await sendEmail(
                    user.email,
                    "Verify your account",
                    `hello ${user.lastName}, your verification code is: ${verificationCode}`,
                    `<div>
                          <h2>Hello ${user.lastName},</h2>
                    <p>Your verification code is: <strong>${verificationCode}</strong></p>
                       <p>Please use this code to verify your account.</p>
                    </div>`
                );

            }catch (error: any) {
               console.error("Failed to register email:", error.message);
            }
        
        return res.status(201).json({ message: createUser });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

// verify user controller
export const verifyUserController = async (req: Request, res: Response) => {
    const { email, verificationCode } = req.body;
    try {

    }catch (error) {
        const user = await getUserByEmailService(email)
        if(!user){
            return res.status(404).json({ message: "User not found" });
        } 
        if (user.verificationCode === verificationCode) {
            await verifyUserService(email)
        }

        //send verification email-success

        try {
                  await sendEmail(
                    user.email,
                    "Verify your account",
                    `hello ${user.lastName}, your verification code is: ${verificationCode}`,
                    `<div>
                          <h2>Hello ${user.lastName},</h2>
                    <p>Your verification code is: <strong>${verificationCode}</strong></p>
                       <p>Please use this code to verify your account.</p>
                    </div>`
                );

            }catch (error) {
               console.error("Failed to send verification sucess email:", error);
            }
            return res.status(200).json({message: "User verified sucessfully"});
            
         
        
    }
}


    



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
                email: userExist.email
            }
        })

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

function sendMail(email: any, arg1: string, arg2: string, arg3: string) {
    throw new Error('Function not implemented.');
}

