/* -------------------------------------------------------------------------- */
/*                              Correos con GMAIL                             */
/* -------------------------------------------------------------------------- */

import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporterGmail = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.ADMIN_GMAIL,
        pass: process.env.PASS_GMAIL,
    },
});

async function sendMailGmail(subject, html) {
    try {
        const mailOptions = {
            from: process.env.ADMIN_GMAIL,
            to: process.env.ADMIN_GMAIL,
            subject: subject,
            html: html,
        };
        const response = await transporterGmail.sendMail(mailOptions);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export default sendMailGmail;