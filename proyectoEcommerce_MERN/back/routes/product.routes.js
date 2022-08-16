import express  from 'express';
const routerProd = express.Router();
import * as productController from '../controllers/product.controller.js';
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js'



// -------------------PRODUCTS--------------------------------//
//GET PRODUCTS
routerProd.get('/', productController.getAllProds)

//GET PRODUCTS by ID 
routerProd.get("/:id", productController.prodsByID);

//GET PRODUCTS by Category 
routerProd.get("/category/:categoria", productController.prodsByCat);

//https://github.com/FaztWeb/company-products-api/blob/master/src/routes/products.routes.js

// -------------------ADMINISTRADORES--------------------------------//
//-->AGREGAR productos al listado
routerProd.post('/', [verifyToken, isAdmin], productController.addProduct);

//-->ACTUALIZAR un producto por su id 
routerProd.put('/:id', [verifyToken, isAdmin], productController.updateProd);

//BORRAR un producto por su id 
routerProd.delete('/:id', [verifyToken, isAdmin], productController.deleteProdByID);

export default routerProd;