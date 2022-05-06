/* --------------------------------- CREATE --------------------------------- */
import "./db.js";
import { ProductModel } from "../models/product.model.js";
 import { ChatModel } from "../models/chat.model.js";

const chat1 = {
  author: {
        id: 'rick@gm', 
        nombre: 'Rick', 
        apellido: 'Sanchez', 
        alias: 'Ricky',
        avatar: 'https://uopss.com/uopss/es/s/contents_images/EP0149-CUSA09988_00-AV00000000000001.jpg.webp'
    },
  text: "Hey!",
  created_at: new Date().toLocaleString()
}

const chat2 = {
  author: {
        id: 'morty@gm', 
        nombre: 'Morty', 
        apellido: 'Smith', 
        alias: 'Morty',
        avatar: 'https://uopss.com/uopss/es/s/contents_images/EP0149-CUSA09988_00-AV00000000000004.jpg.webp'
    },
  text: "What doy you want rick?",
  created_at: new Date().toLocaleString()
}

const chat3 = {
  author: {
        id: 'rick@gm', 
        nombre: 'Rick', 
        apellido: 'Sanchez', 
        alias: 'Ricky',
        avatar: 'https://uopss.com/uopss/es/s/contents_images/EP0149-CUSA09988_00-AV00000000000001.jpg.webp'
    },
  text: "Let's just go on an adventure",
  created_at: new Date().toLocaleString()
}


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

export default async function createDocs() {
  try {
    await ProductModel.create([prod1, prod2, prod3,prod4,prod5,prod6, prod7, prod8]);
    await ChatModel.create([chat1, chat2, chat3]);
    console.log('Datos subidos!');
  } catch (error) {
    console.log(error);
  }
}



