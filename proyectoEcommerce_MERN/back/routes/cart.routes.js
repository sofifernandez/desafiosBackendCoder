import express  from 'express';
const routerCart = express.Router();
import * as cartController from '../controllers/cart.controller.js';


//--> NEW CART
routerCart.post('/', cartController.newCart);

//--> GET ALL CARTS
routerCart.get('/', cartController.getAll)

//--> GET CART by USER
routerCart.get('/user/:user', cartController.getByUser)

//--> GET CART by ID
routerCart.get('/:id', cartController.getByID)

//--> DELETE CART
routerCart.delete('/:id', cartController.deleteByID)

//--> ADD AND UPDATE PRODUCT QUANTITY IN CART
routerCart.post('/:id/productos', cartController.update);

//--> DELETE PRODUCTS
routerCart.delete('/:id/productos/:idProd', cartController.deleteProducts);

//--> CONFIRMAR COMPRA
routerCart.post('/:id/confirmed', cartController.confirmPurchase)

export default routerCart;