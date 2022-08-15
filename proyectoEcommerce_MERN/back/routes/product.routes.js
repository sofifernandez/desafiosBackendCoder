import express  from 'express';
const routerProd = express.Router();
import * as productController from '../controllers/product.controller.js';
import {verifyToken} from '../middleware/auth.middleware.js'


// -------------------PRODUCTS--------------------------------//
//GET PRODUCTS
routerProd.get('/', productController.getAllProds)

//GET PRODUCTS by ID 
routerProd.get("/:id", productController.prodsByID);


//-->AGREGAR productos al listado
routerProd.post('/', verifyToken, productController.addProduct);
//routerProd.post('/', productController.addProduct);

//-->ACTUALIZAR un producto por su id 
routerProd.put('/:id', verifyToken, productController.updateProd);
//routerProd.put('/:id', productController.updateProd);

//BORRAR un producto por su id 
routerProd.delete('/:id', verifyToken, productController.deleteProdByID);
//routerProd.delete('/:id',productController.deleteProdByID);

export default routerProd;