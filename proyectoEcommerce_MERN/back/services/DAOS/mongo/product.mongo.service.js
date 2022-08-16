import "../../../db/db.js"
import { ProductModel } from "../../../models/product.model.js";
import logger from '../../../utils/logger.js';


class Product {
    constructor() {}
    // LEER EL ARCHIVO (CHECK)
    async getAll() {
        try {
            const prods = await ProductModel.find();
            return prods;
        } catch (err) {
            logger.error(`${err}-No products were loaded`)
            return null
        }
    }
    // OBTENER PRODUCTO CON UN DETERMINADO ID (CHECK)
    async getById(id) {
        try {
            const prod = await ProductModel.findOne({ _id: id });
            return prod;
        } catch (err) {
            logger.error(`${err}-Cannot get requested product`)
        }
    }

    async getByCat(tipo) {
        try {
            const prod = await ProductModel.find({ tipo: tipo });
            return prod;
        } catch (err) {
            logger.error(`${err}-Cannot get requested product`)
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
            const newProd = await new ProductModel(producto);
            await newProd.save().then((res) => console.log(res)).catch((err) => console.log(err));
            return newProd
        } catch (err) {
            logger.error(`${err}-Product not saved`)
            return err
        }
    }

    //MODIFICAR PRODUCTOS EXISTENTES (CHECK)
    async updateById(IDupdate, data) {
        try {
            await ProductModel.updateOne({ _id: IDupdate }, data).
                then(() => logger.info(`Product ${IDupdate} updated`)).catch((err) => {
                    logger.error(`${err}-Product not updated`);
            });
            return 'Success!'
        } catch (err) {
            logger.error(`${err}-Product not updated`);
            return err
        }
    }
}

export default Product;


