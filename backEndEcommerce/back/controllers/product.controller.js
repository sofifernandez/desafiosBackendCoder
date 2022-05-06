import "../db/db.js";
import { ProductModel } from "../models/product.model.js";

class Product {
    constructor() {}

    // LEER EL ARCHIVO (CHECK)
    async getAll() {
        try {
            const prods = await ProductModel.find();
            return prods;
        } catch (err) {
            console.log(err, 'Ooops, there are no products');
            return null
        }
    }

    // OBTENER PRODUCTO CON UN DETERMINADO ID (CHECK)
    async getById(id) {
        try {
            const prod = await ProductModel.findOne({ _id: id });
            return prod;
        } catch (err) {
            console.log(err, 'Product does not exist')
        }
    }
    //ELIMINAR PRODUCTOS CON UN DETERMINADO ID (CHECK)
    async deleteById(itemId) {
        try {
            await ProductModel.deleteOne({ _id: itemId }).then((res) => console.log(res, 'Product deleted!')).catch((err) => console.log(err));;
        } catch (err) {
            return 'Product does not exist'
        }
    }

    //AGREGAR PRODUCTOS (CHECK)
    async saveProduct(producto) {
        try {
            console.log('ENTRA')
            const newProd = await new ProductModel(producto);
            await newProd.save().then((res) => console.log(res)).catch((err) => console.log(err));
        } catch (err) {
            return err
        }
    }

    //MODIFICAR PRODUCTOS EXISTENTES (CHECK)
    async updateById(IDupdate, data) {
        try {
            console.log(IDupdate)
            await ProductModel.updateOne({ _id: IDupdate }, data).
                then(() => console.log('Producto actualizado')).catch((err) => {
                console.log("Entro al catch", err);
            });
            return 'Success!'
        } catch (err) {
            return err
        }
    }
}


export default Product;


