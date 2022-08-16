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
  },
    age: {
    type: String,
    required: true,
  },
    prefix: {
    type: String,
    required: true,
  },
    phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }, 
  role: {
    type: String,
    default: 'client',
    required: false
  }
});

export const UserModel = mongoose.model("User", Schema);