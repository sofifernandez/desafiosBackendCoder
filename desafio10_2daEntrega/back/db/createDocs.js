/* --------------------------------- CREATE --------------------------------- */
import "./db.js";
import { ProductModel } from "../models/product.model.js";
import { ChatModel } from "../models/chat.model.js";

const prod1 = {
    nombre: "Quarter",
    tipo: "anillos",
    precio: 1700,
    imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/anillos/quarter.png",
    stock: 12,
    quantity: 0,
    total: null
};
const prod2 = {
    nombre: "Patrón y Patrona",
    tipo: "anillos",
    precio: 2100,
    imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/anillos/patron_a.png",
    stock: 13,
    quantity: 0,
    total: null
};
const prod3 = {
    nombre: "Mold",
    tipo: "anillos",
    precio: 1700,
    imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/anillos/mold2.png",
    stock: 4,
    quantity: 0,
    total: null
}

const prod4 = {
    nombre: "Drop, Egg & Line",
    tipo: "anillos",
    precio: 1700,
    imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/anillos/dropEggLine.png",
    stock: 13,
    quantity: 0,
    total: null
}

const prod5 = {
    nombre: "Line",
    tipo: "aros",
    precio: 1700,
    imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/aros/line.png",
    stock: 12,
    quantity: 0,
    total: null
}

const prod6 = {
    nombre: "Quarter",
    tipo: "aros",
    precio: 1900,
    imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/aros/quarter.png",
    stock: 5,
    quantity: 0,
    total: null
}

const prod7 = {
     nombre: "Quarter Long",
    tipo: "aros",
    precio: 2100,
    imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/aros/quarter_long.png",
    stock: 3,
    quantity: 0,
    total: null
}

const prod8 = {
     nombre: "Solid",
    tipo: "aros",
    precio: 2000,
    imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/aros/solid.png",
    stock: 14,
    quantity: 0,
    total: null
}

const chat1 = {
    author: 'morty@gm',
    text: 'Hi Rick',
    created_at: new Date().toLocaleString()
}

const chat2 = {
    author: 'rick@gm',
    text: 'Hi Morty',
    created_at: new Date().toLocaleString()
}

export default async function createDocs() {
    console.log('Hola')
  try {
    const prods = await ProductModel.create([prod1, prod2, prod3,prod4,prod5,prod6, prod7, prod8]);
    const chats = await ChatModel.create([chat1, chat2]);
    console.log(prods,chats );
  } catch (error) {
    console.log(error);
  }
}

