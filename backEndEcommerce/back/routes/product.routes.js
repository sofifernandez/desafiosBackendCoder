import express  from 'express';
import Product from '../controllers/product.controller.js';
const p = new Product();
const routerProd = express.Router();



// -------------------PRODUCTS--------------------------------//
//GET PRODUCTS
routerProd.get('/', async (req, res) => {
  const productos = await p.getAll();
  res.status(200).send(productos);
})

//GET PRODUCTS by ID 
routerProd.get("/:id", async (req, res) => {
  const id = req.params.id;
  const producto = await p.getById(id);
  if (!producto) {
    res.status(400).json({ "InternalError": 'Product Not Found.' })
  } else {
     res.status(200).send(producto);
  }
});

// //-->ACTUALIZAR un producto por su id 
// routerProd.put('/:id', (req, res) => {
//     const IDupdate = req.params.id;
//     const itemUpdate = req.body;
//     res.send(p.updateById(IDupdate, itemUpdate))

// });

export default routerProd;