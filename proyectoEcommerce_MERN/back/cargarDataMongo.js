
import "./db/db.js";
import { ProductModel } from "./models/product.model.js";
import { ChatModel } from "./models/chat.model.js";
import { CartModel } from "./models/cart.model.js";
import {UserModel} from './models/user.model.js'


const chat1 = {
    author: 'admin',
    text: "En qué podemos ayudarlo",
    created_at: new Date().toLocaleString()
}

const chat2 = {
    author: 'cliente1@cliente.com',
    text: "Tengo una pregunta",
    created_at: new Date().toLocaleString()
}

const chat3 = {
    author: 'cliente2@cliente.com',
    text: "Una consulta",
    created_at: new Date().toLocaleString()
}


const prod1 = {
    nombre: "Quarter",
    tipo: "anillos",
    precio: 1700,
    imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/anillos/quarter.png",
    stock: 12,
    quantity: 0,
    total: 0
};
const prod2 = {
    nombre: "Patrón y Patrona",
    tipo: "anillos",
    precio: 2100,
    imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/anillos/patron_a.png",
    stock: 13,
    quantity: 0,
    total: 0
};
const prod3 = {
    nombre: "Mold",
    tipo: "anillos",
    precio: 1700,
    imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/anillos/mold2.png",
    stock: 4,
    quantity: 0,
    total: 0
}

const prod4 = {
    nombre: "Drop, Egg & Line",
    tipo: "anillos",
    precio: 1700,
    imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/anillos/dropEggLine.png",
    stock: 13,
    quantity: 0,
    total: 0
}

const prod5 = {
    nombre: "Line",
    tipo: "aros",
    precio: 1700,
    imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/aros/line.png",
    stock: 12,
    quantity: 0,
    total: 0
}

const prod6 = {
    nombre: "Quarter",
    tipo: "aros",
    precio: 1900,
    imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/aros/quarter.png",
    stock: 5,
    quantity: 0,
    total: 0
}

const prod7 = {
    nombre: "Quarter Long",
    tipo: "aros",
    precio: 2100,
    imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/aros/quarter_long.png",
    stock: 3,
    quantity: 0,
    total: 0
}

const prod8 = {
    nombre: "Solid",
    tipo: "aros",
    precio: 2000,
    imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/aros/solid.png",
    stock: 14,
    quantity: 0,
    total: 0
}

const cart1 = {
    user: 'cliente1@cliente.com',
    created_at: "16/8/2022 16:17:22",
    products: [{
        nombre: "Solid",
        tipo: "aros",
        precio: 2000,
        imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/aros/solid.png",
        stock: 14,
        quantity: 1,
        total: 2000
    },
    {
        nombre: "Quarter Long",
        tipo: "aros",
        precio: 2100,
        imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/aros/quarter_long.png",
        stock: 3,
        quantity: 2,
        total: 4200
    }
    ]
}

const user1 = {
    firstName: 'admin',
    lastName: 'admin',
    direction: 'not',
    age: '30',
    prefix: '+598',
    phone: '99782339',
    email: 'admin',
    password: '$2b$10$KtjfufObFs4qty0gJz5NCOV7at58hSEfEeM842f.FpUWT7.D5DPNW',
    role: 'admin'
}

const user2 = {
    firstName: 'Rick',
    lastName: 'Sanchez',
    direction: 'c-137',
    age: '60',
    prefix: '+1',
    phone: '5555555',
    email: 'cliente1@cliente.com',
    password: '$2b$10$YONLVrpql4HJu4DZwRX5N.KN1T16eVAG98Z9wE7684kKrXiptA2kC',
    role: 'client'
}


console.log('HOLA')

async function  createDocs () {
    try {
        await ProductModel.create([prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8]);
        await ChatModel.create([chat1, chat2, chat3]);
        await CartModel.create([cart1])
        await UserModel.create([user1, user2])
        console.log('Datos subidos!');
    } catch (error) {
        console.log(error);
    }
}

createDocs ()
