import express  from 'express';
import ProductTest from '../utils/product.utils.js';
const p = new ProductTest();
const routerProdTest = express.Router();

// -------------------PRODUCTS--------------------------------//
//GET PRODUCTS
routerProdTest.get('/', async (req, res) => {
  const productos = await p.getTestProds();
  res.status(200).send(productos);
})

export default routerProdTest;