const fs = require('fs');

class Contenedor {
    constructor(file) {
        this.file = file;
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
            return null;
        }
    }

    //ELIMINAR PRODUCTOS CON UN DETERMINADO ID
    async deleteById(id) {
        try {
            const dataProducts = await this.getAll();
            const producto = dataProducts.find(prod => prod.id === id);
            if (producto) {
                const newArray = dataProducts.filter(prod => prod.id != id)
                fs.writeFileSync(this.file, JSON.stringify(newArray));
                return(`Product with ID=${id} was successfully removed`)
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
    async save(title, price, thumbnail) {
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

    //MODIFICAR PRODUCTOS EXISTENTES
    async modify(id, title, price, thumbnail ){
        try {
            const dataProducts = await this.getAll();
            const objIndex = dataProducts.findIndex((obj => obj.id === id))
            console.log('objIndex', objIndex)
            if (objIndex >= 0) {
                dataProducts[objIndex] = { title, price, thumbnail, id }
                fs.promises.writeFile(this.file, JSON.stringify(dataProducts))
                return `Successfully modified product: id: ${id}, title: ${title}, price: ${price}, thumbnail: ${thumbnail}`
            } else {
                console.log("Product does not exist")
                return "Ooops, product does not exist"
            }
        } catch (err) {
            console.log(err, 'Error, file not saved');
            return null;
        }
    }
}


module.exports = Contenedor;


