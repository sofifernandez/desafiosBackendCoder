//ASI FUNCIONA:
const express = require('express');
const fs = require("fs");
const { engine } = require("express-handlebars");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const Producto = require('./controladores.js');

const io = new Server(server)


//Configuracion servidor Express y Handlebar----------------------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.set("views", "./src/views");
app.set("view engine", "hbs");

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  }),
);

// RUTAS Y FUNCIONES---------------------------------------------------------------------------------------------
app.get("/", async (req, res) => {
  res.render("main", {
  });
});

// PARA PROBAR AGREGAR:
// const productos = [
//   {
//     "title": "Pizarra",
//     "price": 200,
//     "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/board-math-class-school-1024.png",
//     "id":4
//     }
//   ]


// WEBSOCKETS-----------------------------------------------------------------------------------------------------
const contenedor = new Producto('./src/productos.json');

io.on("connection", async (socket) => {
  console.log("💻 Nuevo usuario conectado!");
  socket.on("disconnect", () => {
    console.log("❌ Usuario desconectado");
  });

  //Enviar productos al Front
  socket.emit('sendProducts', await contenedor.getAll())
  // Nuevos productos desde el Front
  socket.on("addProducts", async (data) => {
    const { title, price, thumbnail } = data
    new Producto('./src/productos.json').saveProduct(title, price, thumbnail)
    io.sockets.emit("sendProducts", await contenedor.getAll())
  });

  //CHAT MANAGER-------------------------------------------------------------------
  const messages = JSON.parse(fs.readFileSync('./src/chatmessages.json', 'utf-8'));
  socket.emit("sendMessages", messages); //enviar chats guardados al Front
  socket.on("sendNewChat", (data) => {
     messages.push(data);
    fs.writeFileSync('./src/chatmessages.json', JSON.stringify(messages), 'utf-8');
    io.sockets.emit("sendMessages", messages); //==> devuelve a todos los usuarios conectados 
  });

});


const PORT = 8080;
server.listen(PORT, () => console.log(`🚀 Server started on port http://localhost:${PORT}`));
server.on('error', (err) => console.log(err));

