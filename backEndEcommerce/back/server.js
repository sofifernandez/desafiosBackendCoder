//Requerimientos
import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import http from 'http'
import { Server } from 'socket.io'
import mongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "./utils/passport.utils.js";

dotenv.config();

// Rutas
import routerProd from "./routes/product.routes.js";
import routerCart from "./routes/cart.routes.js"
import routerAdmin from "./routes/admin.routes.js"


const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }))
//Uso de rutas-------------------------------------//
app.use('/api/productos', routerProd)
app.use('/api/carrito', routerCart)
app.use('/api/admin', routerAdmin)
// app.use(cors({
//   origin: ['http://localhost:3000'],
//   methods: ['POST', 'PUT', 'GET'],
//    allowedHeaders: ["my-custom-header"],
//    credentials: true
// }));

// app.use(cors({
//    origin: 'http://localhost:3000',
//   methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
//    allowedHeaders: ["my-custom-header"],
//    credentials: true
// }));


const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})

//http://127.0.0.1:3000

// const io = new Server(server, {
//    cors: { origin: 'http://localhost:3000'}
// });

// app.use(cors({
//    origin: 'http://localhost:3000',
//    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
//    credentials: true,
// }));


app.use(session({
   store: mongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
      },
   }),    
   secret: process.env.SECRET,
   resave: true,
   saveUninitialized: true,
  //  cookie: {
  //     httpOnly: true,
  //     maxAge: Number(process.env.EXPIRE),
  //     sameSite: false
  //  },
  //  rolling: true //Reset the cookie Max-Age on every request
}));

app.use(passport.initialize());
app.use(passport.session());

//****************************************************************************/
//DESCOMENTAR PARA SUBIR LOS PRODUCTOS Y CHATS A LA BASE DE DATOS ECOMMERCE de Mongo
// import createDocs from './db/createDocs.js'
// createDocs();
//****************************************************************************/


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