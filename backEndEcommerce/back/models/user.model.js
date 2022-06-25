import mongoose from "mongoose";

const Schema = new mongoose.Schema({
   firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
    direction: {
    type: String,
    required: true,
    unique: true
  },
    age: {
    type: String,
    required: true,
    unique: true
  },
    prefix: {
    type: String,
    required: true,
    unique: true
  },
    phone: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

export const UserModel = mongoose.model("User", Schema);