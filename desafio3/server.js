const express = require("express"); 
const Contenedor = require('./contenedor.js');

const app = express(); 
const PORT = 8080;
//Crear server
const server = app.listen(PORT, () => {
  console.log(`🔥 Servidor escuchando en el puerto http://localhost:${PORT}`);
});
server.on("error", (error) => console.log(error));


//--------- /HOME
app.get("/", (req, res) => {  
  res.send("<h1> 🔥 Hola servidor Express 🔥</h1><br><a href='/productos'>Ver productos</a><br><a href='productoRandom'>Ver producto RANDOM</a>"); 
});

//-------- /productos
app.get('/productos', async (req, res) => {
    const contenedor = new Contenedor('productos.json');
    const productos = await contenedor.getAll();   
    res.send(productos); 
})

//-------- /productoRandom
app.get('/productoRandom', async (req, res) => {
    const contenedor = new Contenedor('productos.json');
    const productos = await contenedor.getAll(); 
    const productoRandom = await productos[Math.floor(Math.random()*productos.length)];
    res.send(productoRandom); 
})

