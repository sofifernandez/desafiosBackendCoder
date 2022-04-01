const fs = require('fs');
const uniqid = require('uniqid');

class Cart {
    constructor(file) {
        this.file = file;
        //this.file = './db/cart.json';
    }


    // LEER EL ARCHIVO
    async getAllCarts() {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8')
            const dataProducts = JSON.parse(data);
            return dataProducts;
        } catch (err) {
            console.log(err, 'No carts');
            return null
        }
    }
    //NUEVO CARRITO
    async newCart() {
        const cartsList = await this.getAllCarts();
        const id = uniqid();
        const date = new Date().toLocaleString();
        const cart = {
            id: id,
            date: date,
            products: []
        };
        const newCartsList = [...cartsList, cart]
        try {
            fs.writeFileSync(this.file, JSON.stringify(newCartsList, null, 4));
            fs.writeFileSync('PRUEBA.txt', JSON.stringify(newCartsList, null, 4));
            return id
        } catch (err) {
            throw new Error(`No se pudo crear el carrito ${err}`);
        }
    }

    // OBTENER CARRITO SEGÚN ID
    async getCartById(id) {
        const cartsList = await this.getAllCarts();
        try {
            const cart = cartsList.find(cart => cart.id === id);
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
        const cartList = await this.getAllCarts();
        try {
            const cart = cartList.find(cart => cart.id === idcart);
            const objIndex = cart.products.findIndex((obj => obj.id === idprod))
            if (objIndex >= 0) {
                cart.products[objIndex] = { id: idprod, nombre, tipo, precio, imagen, stock, quantity, total }
                await fs.promises.writeFile(this.file, JSON.stringify(cartList, null, 4))
                return idcart
            } else {
                const newProd = { id: idprod, nombre, tipo, precio, imagen, stock, quantity, total }
                cart.products.push(newProd)
                await fs.promises.writeFile(this.file, JSON.stringify(cartList, null, 4))
                return idcart
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProd(idcart, idprod) {
        const cartList = await this.getAllCarts();
        const index = cartList.findIndex(cart => cart.id === idcart)
        const newProdList = cartList[index].products.filter(prods => prods.id !== idprod);
        cartList[index].products = newProdList
        // const newCartsList = [...cartList]
        console.log(cartList[index].products)
        console.log(typeof(cartList))
        console.log(JSON.stringify(cartList))
        try {
            await fs.promises.writeFile(this.file, JSON.stringify(cartList, null, 4)); //--> ESTO NO FUNCIONA
            await fs.promises.writeFile('PRUEBA.txt', JSON.stringify(cartList, null, 4)) //--> ESTO FUNCIONA.
        } catch (err) {
            console.log(err)
        }
        
    }


    //ELIMINAR CART CON UN DETERMINADO ID
    async deleteCartById(id) {
        const cartsList = await this.getAllCarts();
        try {
            const cart = cartsList.find(cart => cart.id === id);
            if (cart) {
                const newArray = cartsList.filter(cart => cart.id != id)
                fs.writeFileSync(this.file, JSON.stringify(newArray, null, 4));
                return (`Cart with ID=${id} was successfully removed`)
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


module.exports = Cart;