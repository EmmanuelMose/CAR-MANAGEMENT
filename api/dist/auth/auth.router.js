"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("./auth.controller");
const user = (app) => {
    // register user route
    app.route("/auth/register").post(async (req, res, next) => {
        try {
            await (0, auth_controller_1.registerUserController)(req, res);
        }
        catch (error) {
            next(error); //means that if an error occurs, it will be passed to the next middleware, which in this case is the error handler
        }
    });
    //verify user route
    app.route("/auth/verify").post(async (req, res, next) => {
        try {
            await (0, auth_controller_1.verifyUserController)(req, res);
        }
        catch (error) {
            next(error); // Passes the error to the next middleware                
        }
    });
    // login user route
    app.route("/auth/login").post(async (req, res, next) => {
        try {
            await (0, auth_controller_1.loginUserController)(req, res);
        }
        catch (error) {
            next(error); // Passes the error to the next middleware                
        }
    });
};
exports.default = user;
