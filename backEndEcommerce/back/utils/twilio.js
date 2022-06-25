import twilio from "twilio";
import dotenv from "dotenv";
import logger from "./logger.js";

dotenv.config();

const client = twilio(process.env.SID_TWILIO, process.env.TOKEN_TWILIO);

export const sendSMS = async (body, to) => {
  try {
    const message = {
        body: body,
        //from:`${process.env.SMS_TWILO}`,
      messagingServiceSid: `${process.env.MESSAGING_SERVICE_SID}`,
      to: to,
    };
    const response = await client.messages.create(message);
    logger.info('SMS--------',response);
  } catch (error) {
    logger.error(error);
  }
}



export const sendWhatsApp = async (body) => {
  try {
    const message = {
      body: body,
      from: `whatsapp:${process.env.TWILIO_PHONE}`,
      to: `whatsapp:${process.env.PHONE_ADMIN}`
    };
    // if (att!='') {
    //   message.mediaUrl= [att]
    // };
    const response = await client.messages.create(message);
    logger.info('WP-----------',response);
  } catch (error) {
    logger.error(error);
  }
}