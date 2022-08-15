
//Requerimientos
import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import http from 'http'
import { Server } from 'socket.io'
import mongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import logger from './utils/logger.js';
import compression from 'compression';
//import minimist from 'minimist';



dotenv.config();
const options = {
   default: {
      PORT: 8000
   }
}

// const arg = minimist(process.argv.slice(2), options);
// const PORT = arg.port;

// Rutas
import routerProd from "./routes/product.routes.js";
import routerCart from "./routes/cart.routes.js"
import userRouter from "./routes/user.routes.js"
import routerInfo from "./routes/info.routes.js"
import routerRandom from './routes/randoms.routes.js'
import routerGraphql from "./routes/graphql.routes.js";


const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }))
app.use(session({
   store: mongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
      },
   }),    
   secret: process.env.API_SECRET,
   resave: true,
   saveUninitialized: true,
   cookie: {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
      sameSite: false
   },
  //  rolling: true //Reset the cookie Max-Age on every request
}));


//Uso de rutas-------------------------------------//
app.use('/api/productos', routerProd)
app.use('/api/carrito', routerCart)
app.use('/api/user', userRouter)
app.use('/api/info', routerInfo)
app.use('/api/randoms', routerRandom)
app.use('/api/graphql', routerGraphql)


const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})


app.use(session({
   store: mongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
      },
   }),    
   secret: process.env.API_SECRET,
   resave: true,
   saveUninitialized: true,
   cookie: {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
      sameSite: false
   },
  //  rolling: true //Reset the cookie Max-Age on every request
}));


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
app.get('/', (req, res) => {
   res.send(`
      <h1>Express server</h1>
      <h2>process - ${process.pid} en puerto ${PORT} </h2>
   `)
})

app.all('*', (req, res) => { //MENSAJE PARA RUTA NO IMPLEMENTADA:
   logger.warn(`${req.method}  - ${req.originalUrl} - INEXISTENTE.`);
   res.status(501).json({ error: -2, descripcion: `Ruta no implementada` })
})
logger.info(process.argv)
const PORT = parseInt(process.argv[2]) || 8080;
server.listen(PORT, () => console.log(`🚀 Server started on port http://localhost:${PORT} - process ${process.pid}`));
server.on('error', (err) => logger.error(`error ${err}`));