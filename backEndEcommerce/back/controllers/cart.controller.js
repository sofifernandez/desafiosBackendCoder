import Cart from '../services/cart.service.js';
const c = Cart.initInstancia();
import { mailNuevaVenta, wpNuevaVenta, smsNuevaVenta } from '../controllers/notification.controllers.js';
import User from '../services/user.services.js';
const u = User.initInstancia();

export const newCart= async (req, res) => { 
  const  user  = req.body
  const id = await c.newCart(user.email)
  res.status(200).send(id) 
}

export const getAll= async (req, res) => {
  const carts = await c.getAllCarts()
  if (!carts) {
    res.status(400).json({ "InternalError": 'CART Not Found.' })
  } else {
    res.status(200).send(carts);
  }
}

export const getByUser=async (req, res) => {
  const user = req.params.user
  const cart = await c.getCartByUser(user)
  if (!cart) {
    res.status(200).json( null )
  } else {
    res.status(200).send(cart);
  }
}

export const getByID=async (req, res) => {
  const id = req.params.id
  const cart = await c.getCartById(id)
  if (!cart) {
    res.status(400).json({ "InternalError": 'CART Not Found.' })
  } else {
    res.status(200).send(cart);
  }
}

export const deleteByID=async (req, res) => {
  const id = req.params.id
  const success = await c.deleteCartById(id)
  if (success==='Fallo') {
    res.status(400).json({ "InternalError": 'Cart Not Found.' })
  } else {
    res.status(200).send(success);
  }
}

export const update = async (req, res) => {
  const idcart = req.params.id
  const { _id, nombre, tipo, precio, imagen, stock, quantity, total } = req.body
  const updatedCart = await c.updateCart(idcart, _id, nombre, tipo, precio, imagen, stock, quantity, total)
  res.status(200).send(updatedCart)

}

export const deleteProducts =async (req, res) => {
  const { id, idProd } = req.params
  const updatedCart = await c.deleteProd(id, idProd)
  res.status(200).json({ "mensaje": 'success' })
} 
export const confirmPurchase= async (req, res) => {
  const id = req.params.id
  const cart = await c.getCartById(id);
  const user = await u.getUserByeMail(cart.user)
  //console.log(user)
  mailNuevaVenta(cart, user);
  wpNuevaVenta(cart)
  smsNuevaVenta(cart,user)
  res.status(200).json({"mensaje": 'success'})
}