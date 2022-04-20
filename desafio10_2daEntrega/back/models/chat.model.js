import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    max: 100,
  },
  text: {
    type: String,
    required: true,
    max: 100,
  },
  created_at: {
    type: String,
    default: null,
    required:true,
  }
});

export const ChatModel = mongoose.model("Chat", Schema);