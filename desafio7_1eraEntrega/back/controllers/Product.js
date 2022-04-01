const fs = require('fs');
const uniqid = require('uniqid');

class Product {
    constructor(file) {
        this.file = file;
        //this.file = './db/productos.json';
    }

    // LEER EL ARCHIVO Y DEJARLO COMO JSON
    async getAll() {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8')
            const dataProducts = JSON.parse(data);
            return dataProducts;
        } catch (err) {
            console.log(err, 'Ooops, there are no products');
            return null
        }
    }

    // OBTENER PRODUCTOS CON UN DETERMINADO ID
    async getById(id) {
        try {
            const dataProducts = await this.getAll();
            const producto = dataProducts.find(prod => prod.id === id);
            if (producto) {
                //console.log(producto)
                return producto;
            } else {
                console.log('Product does not exist')
            }
        } catch (err) {
            console.log(err, 'Error, file not found');
            return err;
        }
    }

    //ELIMINAR PRODUCTOS CON UN DETERMINADO ID
    async deleteById(id) {
        try {
            const dataProducts = await this.getAll();
            const producto = dataProducts.find(prod => prod.id === id);
            if (producto) {
                const newArray = dataProducts.filter(prod => prod.id != id)
                console.log(newArray)
                fs.writeFileSync(this.file, JSON.stringify(newArray,  null, 4));
                return (`Product with ID=${id} was successfully removed`)
            } else {
                console.log('Product does not exist')
                return 'Product does not exist'
            }
        } catch (err) {
            console.log('Error, file not found');
            return null;
        }
    }

    //ELIMINAR TODOS LOS PRODUCTOS
    deleteAll() {
        const emptyArray = [];
        fs.writeFileSync(this.file, JSON.stringify(emptyArray));
        console.log('Borraste todo!')
    }

    //AGREGAR PRODUCTOS
    async saveProduct(product) {
        try {
            const dataProducts = await this.getAll();
            const id=uniqid()
            const newProd = {...product, id}
            const newData = [...dataProducts, newProd]
            fs.promises.writeFile(this.file, JSON.stringify(newData, null, 4))
            //console.log(newProd)
            return newProd.id
        } catch (err) {
            console.log(err, 'Error, file not saved');
            return null;
        }
    }

    //MODIFICAR PRODUCTOS EXISTENTES
    async updateById  (id, itmUpdate) {
        const itemList = await this.getAll();
        const date = new Date().toLocaleString();
        const index = itemList.findIndex(itm => itm.id === id);
        if (index < 0) {
            throw new Error(`No se encuentra el producto`);
        } else {
            const newItem = { ...itmUpdate, id: id, "MODIFIED ON": date, }; // le agrego el id nuevamente
            itemList[index] = newItem;
            try {
                //console.log(newItem)
                fs.writeFileSync(this.file, JSON.stringify(itemList, null, 4));
            } catch (err) {
                throw new Error(`No se pudo actualizar el item erro: ${err}`);
            }
        }
    }
}


module.exports = Product;


