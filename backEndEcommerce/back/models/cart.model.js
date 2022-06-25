import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    max:100
  },
  created_at: {
    type: String,
    required: true,
    max: 100,
  },
  products: {
    type: Array,
    required: false,
  },
});

export const CartModel = mongoose.model("Cart", Schema);
