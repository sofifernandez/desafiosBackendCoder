//Requerimientos
import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import http from 'http'
import { Server } from 'socket.io'
import mongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";

dotenv.config();

// Rutas
import routerProd from "./routes/product.routes.js";
import routerCart from "./routes/cart.routes.js"
import routerAdmin from "./routes/admin.routes.js"


const app = express();
const server = http.createServer(app);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(cors({
//   origin: ['http://localhost:3000'],
//   methods: ['POST', 'PUT', 'GET'],
//    allowedHeaders: ["my-custom-header"],
//    credentials: true
// }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true); // allows cookie to be sent
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, HEAD, DELETE"); // you must specify the methods used with credentials. "*" will not work. 
    next();
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_URI, // MONGO_URI= EL LOCALHOST DE SIEMPRE
      options: {
        userNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: process.env.SECRET, 
    resave: true, 
    saveUninitialized: true,
    cookie: { maxAge: 30000 },
    rolling:true  //Reset the cookie Max-Age on every request
  }),
);

//****************************************************************************/
//DESCOMENTAR PARA SUBIR LOS PRODUCTOS Y CHATS A LA BASE DE DATOS ECOMMERCE de Mongo
// import createDocs from './db/createDocs.js'
// createDocs();
//****************************************************************************/


//Uso de rutas-------------------------------------//
app.use('/api/productos', routerProd)
app.use('/api/carrito', routerCart)
app.use('/api/admin', routerAdmin)


//**********CHAT MANAGER***********************************************************************************************
import Chat from './controllers/chat.controller.js';
const chat = new Chat();

io.on("connection", async (socket) => {
  console.log("💻 Nuevo usuario conectado!"); //Mensajes de control
  socket.on("disconnect", () => {
    console.log("❌ Usuario desconectado");
  });
  socket.on('connect_error', (err) => {
    console.log(`Connect_error due to ${err.message}`);
  });

  const oldMessages = await chat.getAllChats()  //Obtener chats guardados
  socket.emit("sendMessages", oldMessages)   //Enviar chats guardados al Front:

  socket.on("sendNewChat", async (newMessage) => {  // Obtener los nuevos chats desde el front
    newMessage.created_at = new Date().toLocaleString();
    await chat.saveNewMessage(newMessage); //-->meterlos en la db
    const newChats = await chat.getAllChats()//--> volver a obtener todo
    io.sockets.emit("sendMessages", newChats); //==> devuelve a todos los usuarios conectados 
  });
})
//*********************************************************************************************************

app.all('*', (req, res) => { //MENSAJE PARA RUTA NO IMPLEMENTADA:
  res.status(501).json({ error: -2, descripcion: `Ruta no implementada` })
})
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`🚀 Server started on port http://localhost:${PORT}`),);
server.on('error', (err) => console.log(err));