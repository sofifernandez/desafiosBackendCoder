import express  from 'express';
import Cart from '../controllers/cart.controller.js'
const c = new Cart();
const routerCart = express.Router();

//--> NEW CART
routerCart.post('/', async (req, res) => { 
  const id = await c.newCart()
  console.log(typeof(id))
  res.status(200).send(id) 
});

//--> GET ALL CARTS
routerCart.get('/', async (req, res) => {
  const carts = await c.getAllCarts()
  if (!carts) {
    res.status(400).json({ "InternalError": 'CART Not Found.' })
  } else {
    res.status(200).send(carts);
  }
})

//--> GET CART by ID
routerCart.get('/:id', async (req, res) => {
  const id = req.params.id
  const cart = await c.getCartById(id)
  if (!cart) {
    res.status(400).json({ "InternalError": 'CART Not Found.' })
  } else {
    res.status(200).send(cart);
  }
})

//--> DELETE CART
routerCart.delete('/:id', async (req, res) => {
  const id = req.params.id
  const success = await c.deleteCartById(id)
  if (success==='Fallo') {
    res.status(400).json({ "InternalError": 'Cart Not Found.' })
  } else {
    res.status(200).send(success);
  }
})

//--> ADD AND UPDATE PRODUCT QUANTITY IN CART
routerCart.post('/:id/productos', async (req, res) => {
  const idcart = req.params.id
  const { _id, nombre, tipo, precio, imagen, stock, quantity, total } = req.body
  const updatedCart = await c.updateCart(idcart, _id, nombre, tipo, precio, imagen, stock, quantity, total)
  res.status(200).send(updatedCart)

});

//--> DELETE PRODUCTS
routerCart.delete('/:id/productos/:idProd', async (req, res) => {
  const { id, idProd } = req.params
  const updatedCart = await c.deleteProd(id, idProd)
  res.status(200).json({ "mensaje": 'success' })

});

export default routerCart;