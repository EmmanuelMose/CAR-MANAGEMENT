import { Express } from "express";
import { loginUserController, registerUserController, verifyUserController } from "./auth.controller";

const user = (app: Express) => {
    // register user route
    app.route("/auth/register").post(
        async (req, res, next) => {
            try {
                await registerUserController(req, res);
            } catch (error: any) {
                next(error); //means that if an error occurs, it will be passed to the next middleware, which in this case is the error handler
            }
        }
    )
    //verify user route
    app.route("/auth/verify").post(
        async (req, res, next) => {
            try {
                await verifyUserController(req, res);
            } catch (error) {
                next(error); // Passes the error to the next middleware                
            }
        }
    )

    // login user route
    app.route("/auth/login").post(
        async (req, res, next) => {
            try {
                await loginUserController(req, res);
            } catch (error: any) {
                next(error); // Passes the error to the next middleware                
            }
        }
    )
}

export default user;