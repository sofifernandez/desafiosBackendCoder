const express = require('express')
const cors = require('cors');
const { Router } = express;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const productos = Router();
const carrito = Router();

//RUTAS-------------------------------------//
app.use('/api/productos', productos)
app.use('/api/carrito', carrito)

const ADMIN = true //--> ADMINISTRADORES------//

//DEFINIR CONTENEDORES-------------------------//
const Product = require('./controllers/Product');
const Cart = require('./controllers/Cart');
const p = new Product('db/productos.json');
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
  const id = req.params.id
  const producto = await p.getById(id)
  if (!producto) {
     res.status(400).json({ "InternalError": 'Product Not Found.' })
  } else {
    res.status(200).send(producto);
  }
});

//---------------------CART-----------------------------//

//--> NEW CART
carrito.post('/',   async (req, res) => {  //Crea un carrito y devuelve su id  
  const id = await c.newCart()
  console.log(id)
  res.status(200).send(id) //paso el id como un objeto donde se guarda el valor del return de la funcion newCart
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
carrito.post('/:id/productos',async (req, res) => {  
  const idcart=req.params.id
  const {id, nombre, tipo, precio, imagen, stock, quantity, total} =req.body
  const updatedCart=   await c.updateCart(idcart, id, nombre, tipo, precio, imagen, stock, quantity, total)
  res.status(200).send(updatedCart) 

});

//--> DELETE PRODUCTS
carrito.delete('/:id/productos/:idProd',   async(req, res) => {  
  const { id, idProd } = req.params
  const updatedCart = await c.deleteProd(id, idProd)
  res.status(200).json({ "mensaje": 'success' })

});

//*********************************************************************************************************
//-------- ADMIN ------------------------------------------------------------------------------------------

//-->AGREGAR productos al listado
productos.post('/', (req, res) => {  
  if (!ADMIN) {
        res.status(400).json({error: 400, descripción: 'Ruta Productos Mètodo Delete NO Autorizado'});
  } else {
    const product = req.body;
    res.send(p.saveProduct(product))
    }
    
});

//-->ACTUALIZAR un producto por su id 
productos.put('/:id', (req, res) => {  
  if (!ADMIN) {
        res.status(400).json({error: 400, descripción: 'Ruta Productos Mètodo Delete NO Autorizado'});
  } else {
    const id = req.params.id;
    const itemUpdate = req.body;
    res.send(p.updateById(id, itemUpdate))
  }
    
});

//BORRAR un producto por su id 
productos.delete('/:id', (req, res) => {  
  if (!ADMIN) {
        res.status(400).json({error: 400, descripción: 'Ruta Productos Mètodo Delete NO Autorizado'});
  } else {
    const itemId = req.params.id
    res.send(p.deleteById(itemId))
  }
    
});

//MENSAJE PARA RUTA NO IMPLEMENTADA:
app.all('*', (req, res) => {
  res.status(501).json({ error: -2, descripcion: `Ruta ${req.originalUrl}, method ${req.method} no implementada` })
})

//const PORT = 8080;
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>console.log(`🚀 Server started on port http://localhost:${PORT}`),);
server.on('error', (err) => console.log(err));