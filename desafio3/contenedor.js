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
            console.log(err, 'Ooops, archivo vacio');
            return null
        }
    }

    // OBTENER PRODUCTOS CON UN DETERMINADO ID
    async getById(id) {
        try {
            const dataProducts = await this.getAll();
            const producto = dataProducts.find(prod => prod.id === id);
            if (producto) {
                console.log(producto)
                return producto;
            } else {
                console.log('El producto no existe')
            }
        } catch (err) {
            console.log(err, 'Error al leer archivo');
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
            } else {
                console.log('El producto no existe')
            }
        } catch (err) {
            console.log('Error al leer archivo');
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
            } else {
                const lastID = dataProducts[dataProducts.length - 1].id
                const newProd = { title, price, thumbnail, id: lastID + 1 }
                const newData = [...dataProducts, newProd]
                fs.promises.writeFile(this.file, JSON.stringify(newData))
                console.log('Nuevo producto guardado', newProd.id)
            }

        } catch (err) {
            console.log(err, 'Error al guardar producto');
            return null;
        }
    }
}


module.exports = Contenedor;


