import "../db/db.js";
import { ChatModel } from "../models/chat.model.js";


class Chat {
    constructor() { }

    // LEER CHATS ()
    async getAllChats() {
        try {
            const chats = await ChatModel.find().sort({ created_at: -1 });
            return chats;
        } catch (err) {
            console.log(err, 'Ooops, there are no chats');
            return null
        }
    }
    //AGREGAR CHATS ()
    async saveNewMessage(message) {
        try {
            const newMessage = await new ChatModel(message);
            await newMessage.save().then((res) => console.log(res)).catch((err) => console.log(err));
        } catch (err) {
            return err
        }
    }

}

export default Chat;