import "../db/db.js";
import { ChatModel } from "../models/chat.model.js";

class Chat {
    constructor() { }

     // LEER CHATS (CHECK)
    async getAllChats() {
        try {
            const chats = await ChatModel.find().sort({ created_at: -1 });
            return chats;
        } catch (err) {
            console.log(err, 'Ooops, there are no chats');
            return null
        }
    }

    //AGREGAR CHATS (CHECK)
    async saveNewMessage(message) {
        try {
            console.log('ENTRA')
            const newMessage = await new ChatModel(message);
            await newMessage.save().then((res) => console.log(res)).catch((err) => console.log(err));
            // console.log('Producto agregado', newProd)
            // return 'Product added'
        } catch (err) {
            return err
        }
    }

}

export default Chat;