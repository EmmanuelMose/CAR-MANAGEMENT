"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bothRoleAuth = exports.userRoleAuth = exports.adminRoleAuth = exports.checkRoles = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
// Impelementing a middleware to check user roles
const checkRoles = (requiredRole) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            // check for roles
            if (typeof decoded === "object" &&
                decoded !== null &&
                "role" in decoded) {
                if (requiredRole === "both") {
                    if (decoded.role === "admin" || decoded.role === "user") { // if the decoded role is admin or user, then allow access
                        next();
                        return;
                    }
                } // if the required role is both, then allow access to admin and user
                else if (decoded.role === requiredRole) { // if the decoded role is the same as the required role, then allow access
                    next();
                    return;
                }
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            else { //happens when the decoded token is not an object or does not have a role property
                res.status(401).json({ message: "Invalid Token Payload" });
                return;
            }
        }
        catch (error) {
            res.status(401).json({ message: "Invalid Token" });
            return;
        }
    };
};
exports.checkRoles = checkRoles;
exports.adminRoleAuth = (0, exports.checkRoles)("admin");
exports.userRoleAuth = (0, exports.checkRoles)("user");
exports.bothRoleAuth = (0, exports.checkRoles)("both");
