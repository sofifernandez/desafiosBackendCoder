import "../db/db.js";
import { CartModel } from "../models/cart.model.js";

class Cart {
    constructor() { }
    
    // LEER EL ARCHIVO
    async getAllCarts() {
         try {
            const carts = await CartModel.find();
            return carts;
        } catch (err) {
            console.log(err, 'Ooops, there are no products');
            return null
        }
    }

    //NUEVO CARRITO
    async newCart() {
        const date = new Date().toLocaleString();
        const cart = {
            created_at: date,
            products: []
        };
        try {
            const newCart = await new CartModel(cart);
            await newCart.save().then((res) => console.log(res)).catch((err) => console.log(err));
            const ID = newCart._id;
            return ID;
        } catch (err) {
            throw new Error(`No se pudo crear el carrito ${err}`);
        }
    }

    // OBTENER CARRITO SEGÚN ID
    async getCartById(id) {
        try {
            const cart = await CartModel.findOne({ _id: id });
            if (cart) {
                return cart;
            } else {
                console.log('cart does not exist')
                return null
            }
        } catch (err) {
            console.log(err, 'Error, file not found');
            return err;
        }
    }

    // ACTUALIZAR CARRITO, BORRAR O SUMAR CANTIDADES
    async updateCart(idcart, idprod, nombre, tipo, precio, imagen, stock, quantity, total) {
        try {
            const cart = await CartModel.findOne({ _id: idcart });
            const objIndex = cart.products.findIndex((obj => obj._id === idprod))
            if (objIndex >= 0) {
                cart.products[objIndex] = { _id: idprod, nombre:nombre, tipo:tipo, precio:precio, imagen:imagen, stock:stock, quantity:quantity, total:total }
            } else {
                const newProd = { _id: idprod, nombre:nombre, tipo:tipo, precio:precio, imagen:imagen, stock:stock, quantity:quantity, total:total  }
                cart.products.push(newProd)
            }
             await CartModel.updateOne({ _id: idcart }, {products:cart.products}).
                then(() => console.log('Carrito actualizado')).catch((err) => {
                console.log("Entro al catch", err);
            });
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProd(idcart, idprod) {
        const cart = await CartModel.findOne({ _id: idcart });
        const newProdList = cart.products.filter(prods => prods._id !== idprod);
        cart.products = newProdList
        try {
             await CartModel.updateOne({ _id: idcart }, {products:cart.products}).
                then(() => console.log('Producto borrado')).catch((err) => {
                console.log("ENTRO AL CATCH------------------------------------", err);
                });
            return 'Exito'
        } catch (err) {
            console.log('ENTRO AL OTRO CATCH----------------------------------', err)
            return 'Fallo'
        }
    }


    //ELIMINAR CART CON UN DETERMINADO ID
    async deleteCartById(idcart) {
        try {
            const cart = await CartModel.findOne({ _id: idcart });
            if (cart) {
                await CartModel.deleteOne({ _id: idcart })
                    .then((res) => console.log(res, 'Cart deleted!')).catch((err) => console.log(err));;
            } else {
                console.log('Cart does not exist')
                return 'Cart does not exist'
            }
        } catch (err) {
            console.log('Error, file not found');
            return null;
        }
    }
}

export default Cart;