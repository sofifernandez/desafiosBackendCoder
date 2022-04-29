//Requerimientos
import express from "express";
import cors from "cors"
import http from 'http'
import { Server } from 'socket.io'
import util from 'util'

// Rutas
import routerProd from "./routes/product.routes.js";
import routerCart from "./routes/cart.routes.js"
import routerProdTest from "./routes/mock.routes.js"

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})

//Uso de rutas-------------------------------------//
app.use('/api/productos', routerProd)
app.use('/api/carrito', routerCart)
app.use('/api/productos-test', routerProdTest)


//****************************************************************************/
//DESCOMENTAR PARA SUBIR LOS PRODUCTOS Y CHATS A LA BASE DE DATOS ECOMMERCE de Mongo
// import createDocs from './db/createDocs.js'
// createDocs();
//****************************************************************************/


//**********CHAT MANAGER***********************************************************************************************
import Chat from './controllers/chat.controller.js';
const chat = new Chat();

// NORMALIZACIÓN DE MENSAJES
import { normalize, schema, } from 'normalizr'
// Definimos un esquema de autor
const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'id' });
// Esquema de mensaje
const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, { idAttribute: '_id' })
// Esquema de posteos
const schemaPosteos = new schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })
const normalizarMensajes = (mensajesConId) => normalize(mensajesConId, schemaPosteos)


async function listNormalizedChats() {
  //const mensajes = await chat.getMockedChats()
  const mockMess = await chat.getAllChats()
  const messToString = JSON.stringify(mockMess)
  const mensajes= JSON.parse(messToString)
  //console.log(mensajes)
  const normalizados = normalizarMensajes({ id: 'mensajes', mensajes })
  console.log(util.inspect(normalizados,false,12,true))
  return normalizados
}

io.on("connection", async (socket) => {
  console.log("💻 Nuevo usuario conectado!"); //Mensajes de control
  socket.on("disconnect", () => {
    console.log("❌ Usuario desconectado");
  });
  socket.on('connect_error', (err) => {
    console.log(`Connect_error due to ${err.message}`);
  });

  //const oldMessages = await chat.getAllChats()  //Obtener chats
  //socket.emit("sendMessages", oldMessages)   //Enviar chats guardados al Front:
  socket.emit("sendMessages", await listNormalizedChats())
  
  socket.on("sendNewChat", async (newMessage) => {  // Obtener los nuevos chats desde el front
    newMessage.created_at = new Date().toLocaleString();
    await chat.saveNewMessage(newMessage); //-->meterlos en la db
    // const newChats = await chat.getAllChats()//--> volver a obtener todo
    // io.sockets.emit("sendMessages", newChats); //==> devuelve a todos los usuarios conectados 
    io.sockets.emit("sendMessages", await listNormalizedChats()); //==> devuelve a todos los usuarios conectados 
  });
})
//*********************************************************************************************************


app.all('*', (req, res) => { //MENSAJE PARA RUTA NO IMPLEMENTADA:
  res.status(501).json({ error: -2, descripcion: `Ruta no implementada` })
})
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`🚀 Server started on port http://localhost:${PORT}`),);
server.on('error', (err) => console.log(err));