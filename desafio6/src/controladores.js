const fs = require('fs');
//const express = require('express');
//const routerProd = express.Router();

class Producto {
    constructor(file) {
        this.file = file;
    }

    // LEER EL ARCHIVO Y DEJARLO COMO JSON
    async getAll() {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8')
            const dataProducts = JSON.parse(data);
            console.log(dataProducts)
            return dataProducts;
        } catch (err) {
            console.log(err, 'Ooops, there are no products');
            return null
        }
    }

   
    //AGREGAR PRODUCTOS
    async saveProduct(title, price, thumbnail) {
        try {
            const dataProducts = await this.getAll();
            if (!dataProducts.length) {
                const newProd = { title, price, thumbnail, id: 1 }
                fs.promises.writeFile(this.file, JSON.stringify([newProd]))
                console.log('Primer producto guardado!')
                return null
            } else {
                const maxID= Math.max(...dataProducts.map(x => x.id))
                const newProd = { title, price, thumbnail, id: maxID + 1 }
                const newData = [...dataProducts, newProd]
                fs.promises.writeFile(this.file, JSON.stringify(newData))
                return newProd.id
            }
        } catch (err) {
            console.log(err, 'Error, file not saved');
            return null;
        }
    }

}


module.exports = Producto;