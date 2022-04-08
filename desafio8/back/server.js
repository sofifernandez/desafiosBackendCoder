import  express  from "express";
import cors from "cors"
const { Router } = express;
import http from 'http'
import {Server} from 'socket.io'


const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const productos = Router();
const carrito = Router();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})


//RUTAS-------------------------------------//
app.use('/api/productos', productos)
app.use('/api/carrito', carrito)

//--> ADMINISTRADORES------//
const ADMIN = true 

//DEFINIR CONTENEDORES-------------------------//
import Product from './controllers/Product.js';
import Cart from './controllers/Cart.js'
const p = new Product();
const c = new Cart('db/cart.json');


//********************CLIENT***********************************************************************

// -------------------PRODUCTS--------------------------------//
//GET PRODUCTS
productos.get('/', async (req, res) => {
  const productos = await p.getAll();
  res.status(200).send(productos);
})

//GET PRODUCTS by ID 
productos.get("/:id", async (req, res) => {
  const id = Number(req.params.id)
  const producto = await p.getById(id)
  if (!producto) {
    res.status(400).json({ "InternalError": 'Product Not Found.' })
  } else {
     res.status(200).send(producto);
  }
});

//---------------------CART-----------------------------//

//--> NEW CART
carrito.post('/', async (req, res) => { 
  const id = await c.newCart()
  console.log(id)
  res.status(200).send(id) 
});

//--> GET ALL CARTS
carrito.get('/', async (req, res) => {
  const carts = await c.getAllCarts()
  if (!carts) {
    res.status(400).json({ "InternalError": 'CART Not Found.' })
  } else {
    res.status(200).send(carts);
  }
})

//--> GET CART by ID
carrito.get('/:id', async (req, res) => {
  const id = req.params.id
  const cart = await c.getCartById(id)
  if (!cart) {
    res.status(400).json({ "InternalError": 'CART Not Found.' })
  } else {
    res.status(200).send(cart);
  }
})

//--> DELETE CART
carrito.delete('/:id', async (req, res) => {
  const id = req.params.id
  const success = await c.deleteCartById(id)
  if (!success) {
    res.status(400).json({ "InternalError": 'Cart Not Found.' })
  } else {
    res.status(200).send(success);
  }
})

//--> ADD AND UPDATE PRODUCT QUANTITY IN CART
carrito.post('/:id/productos', async (req, res) => {
  const idcart = req.params.id
  const { id, nombre, tipo, precio, imagen, stock, quantity, total } = req.body
  const updatedCart = await c.updateCart(idcart, id, nombre, tipo, precio, imagen, stock, quantity, total)
  res.status(200).send(updatedCart)

});

//--> DELETE PRODUCTS
carrito.delete('/:id/productos/:idProd', async (req, res) => {
  const { id, idProd } = req.params
  const updatedCart = await c.deleteProd(id, idProd)
  res.status(200).json({ "mensaje": 'success' })

});

//*********************************************************************************************************
//-------- ADMIN ------------------------------------------------------------------------------------------

//-->AGREGAR productos al listado
productos.post('/', (req, res) => {
  if (!ADMIN) {
    res.status(400).json({ error: 400, descripción: 'NO Autorizado' });
  } else {

      const { nombre, tipo, precio, imagen, stock } = req.body;
      const newProd = {
        nombre,
        tipo,
        precio,
        imagen,
        stock,
      }
    const msg = p.saveProduct(newProd)
    res.status(200).json(msg);
  }

});

//-->ACTUALIZAR un producto por su id 
productos.put('/:id', (req, res) => {
  if (!ADMIN) {
    res.status(400).json({ error: 400, descripción: 'NO Autorizado' });
  } else {
    const IDupdate= Number(req.params.id)
    const itemUpdate = req.body;
    res.send(p.updateById(IDupdate, itemUpdate))
}

});

//BORRAR un producto por su id 
productos.delete('/:id', (req, res) => {
  if (!ADMIN) {
    res.status(400).json({ error: 400, descripción: 'NO Autorizado' });
  } else {
    try {
    const itemId = Number(req.params.id)
    res.send(p.deleteById(itemId))
    }
    catch (err) {
       res.status(400).json({error: err});
    }
  }
});


//*********************************************************************************************************
//-------- CHAT ------------------------------------------------------------------------------------------
import configSQLite from "./db/configSQLite.js"; // importar la configuracion
const knex = configSQLite

 //CHAT MANAGER-------------------------------------------------------------------
io.on("connection", async (socket) => {
  //Mensajes de control
  console.log("💻 Nuevo usuario conectado!");
  socket.on("disconnect", () => {
    console.log("❌ Usuario desconectado");
  });
  socket.on('connect_error', (err) => {
      console.log(`Connect_error due to ${err.message}`);
  });

  //Obtener chats guardados
  const messages= await knex
    .from("chats")
    .select("*")
    .orderBy("created_at", "desc")
  //Enviar chats guardados al Front:
  socket.emit("sendMessages", messages)

  // Obtener los nuevos chats desde el front
  socket.on("sendNewChat", async (newMessage) => {
    newMessage.created_at = new Date().toLocaleString();
    await knex('chats').insert(newMessage); //-->meterlos en la db
    const newChat = await knex('chats').select("*").orderBy("created_at", "desc")//--> volver a obtener todo
    io.sockets.emit("sendMessages", newChat); //==> devuelve a todos los usuarios conectados 
  });

})

//MENSAJE PARA RUTA NO IMPLEMENTADA:
app.all('*', (req, res) => {
  res.status(501).json({ error: -2, descripcion: `Ruta no implementada` })
})

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`🚀 Server started on port http://localhost:${PORT}`),);
server.on('error', (err) => console.log(err));