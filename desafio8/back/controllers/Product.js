import configmysql from "../db/configmysql.js"; // importar la configuracion


class Product {
    constructor() {
        this.knex = configmysql;
    }

    // LEER EL ARCHIVO 
    async getAll() {
        try {
            const prods = await this.knex.select().from('productos');
            return prods;
        } catch (err) {
            console.log(err, 'Ooops, there are no products');
            return null
        }
    }

    // OBTENER PRODUCTOS CON UN DETERMINADO ID
    async getById(id) {
        try {
            const prod = await this.knex.select().from('productos').where('id', id);
            return prod[0];
        } catch (err) {
            console.log(err, 'Product does not exist')
        }
    }
    //ELIMINAR PRODUCTOS CON UN DETERMINADO ID
    async deleteById(itemId) {
        try {
            await this.knex('productos').where({ id: itemId })
                .del()
                .then(()=>console.log('Successfully deteled'))
                .catch((err)=>console.log(err));
        } catch (err) {
            return 'Product does not exist'
        }
    }

    //AGREGAR PRODUCTOS
    async saveProduct(producto) {
        try {
            producto.created_at = new Date();
            //await this.knex('productos').insert(producto)
            await this.knex('productos')
                .insert(producto);
            console.log('Producto agregado')
            return 'Product added'
        } catch (err) {
            return err
        }
    }

    //MODIFICAR PRODUCTOS EXISTENTES
    async updateById(IDupdate, producto) {
        try {
            console.log(IDupdate)
            producto.updated_at = new Date();
            await this.knex("productos").where({ id: IDupdate })
                .update({
                    nombre: producto.nombre,
                    tipo: producto.tipo,
                    precio: producto.precio,
                    imagen: producto.imagen,
                    stock: producto.stock,
                    quantity: 0,
                    total: null,
                    updated_at: producto.updated_at
                }).then(() => console.log('Producto actualizado')).catch((err) => {
                    console.log("Entro al catch", err);
                });;
            return 'Success!'
        } catch (err) {
            return err
        }
    }
}


export default Product;


