//ASI FUNCIONA:
const express = require('express');
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
app.get("/",  (req, res) => {
  // const contenedor = new Producto('./src/productos.json');
  // const productos = await contenedor.getAll();
  // const existencias = productos.length > 0
  res.render("main", {
    //productos,
    // existencias: existencias,
  });
});

// app.post('/', async(req, res) => {
//   const {title, price, thumbnail} =req.body
//   const contenedor = new Producto('./src/productos.json');
//   const newID= await contenedor.save(title, price, thumbnail) 
//   if (newID) {
//     res.status(200).send(`New producto with ID=${newID} was added to the list`)
//   } else {
//     res.status(400).json({ "InternalError": 'Product Not Added.'})
//   }
//   res.redirect('/')
  
// })

// const productos = [
//   {
//     "title": "Pizarra",
//     "price": 200,
//     "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/board-math-class-school-1024.png",
//     "id":4
//     }
//   ]

// WEBSOCKETS-----------------------------------------------------------------------------------------------------
io.on("connection", (socket) => {
  console.log("💻 Nuevo usuario conectado!");
  socket.on("disconnect", () => {  
    console.log("❌ Usuario desconectado");
  });

async function get() { 
  const contenedor =  new Producto('./src/productos.json');
  const productos = await contenedor.getAll();
  return(productos)
}

  //io.sockets.emit("sendProducts",  new Producto('src/productos.json').getAll(), 'HolaHola' )
  socket.emit('sendProducts', get(), 'HolaHola')
});







const PORT = 8080;
server.listen(PORT, () => console.log(`🚀 Server started on port http://localhost:${PORT}`));
server.on('error', (err) => console.log(err));

