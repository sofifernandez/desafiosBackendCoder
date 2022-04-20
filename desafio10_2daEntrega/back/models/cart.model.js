import mongoose from "mongoose";

const Schema = new mongoose.Schema({
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
