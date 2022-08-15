import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  author: {
    type: Object,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    default:  new Date().toLocaleString(),
    required:true,
  }
});


export const ChatModel = mongoose.model("Chat", Schema);