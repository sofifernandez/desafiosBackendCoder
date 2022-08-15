import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    max: 100,
  },
  tipo: {
    type: String,
    required: false,
    max: 100,
  },
  precio: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
    max: 200,
  },
  stock: {
    type: Number,
    required: true,
    },
  quantity: {
    type: Number,
    required: false,
    default: 0,
    },
  total: {
    type: Number,
    required: false,
    default: 0,
  },
});

export const ProductModel = mongoose.model("Product", Schema);