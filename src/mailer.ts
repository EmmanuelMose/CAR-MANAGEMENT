import nodemailer from "nodemailer"

export const sendEmail =  async (
    email: string,
    subject: string,
    message: string,
    html: string

)=> {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // replace with your SMTP server
            port: 465,
            service:  'gmail', // replace with your email service provider
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
       }else if(mailRes.rejected.length > 0) {
          return 'email not sent';
       }else{
            return 'email server error';
       }
        
} catch (error: any) {
    return JSON.stringify(error.message,null,500);
}
}
