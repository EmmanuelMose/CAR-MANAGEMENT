"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async (email, subject, message, html) => {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com', // replace with your SMTP server
            port: 465,
            service: 'gmail', // replace with your email service provider
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER, // generated ethereal user
                pass: process.env.EMAIL_PASS, // generated ethereal password
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER, // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            text: message, // plain text body
            html: html, // html body
        };
        const mailRes = await transporter.sendMail(mailOptions);
        console.log('mailRes:', mailRes.response);
        if (mailRes.accepted.length > 0) {
            return 'email sent successfully';
        }
        else if (mailRes.rejected.length > 0) {
            return 'email not sent';
        }
        else {
            return 'email server error';
        }
    }
    catch (error) {
        return JSON.stringify(error.message, null, 500);
    }
};
exports.sendEmail = sendEmail;
