import express  from 'express';
import Product from '../controllers/product.controller.js';
import {verifyToken} from '../middleware/auth.middleware.js'
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


//-->AGREGAR productos al listado
routerProd.post('/', verifyToken, (req, res) => {
    const { nombre, tipo, precio, imagen, stock } = req.body.productData;
    const newProd = {
        nombre,
        tipo,
        precio,
        imagen,
        stock,
    }
    const msg = p.saveProduct(newProd)
    res.status(200).json(msg);


});

//-->ACTUALIZAR un producto por su id 
routerProd.put('/:id', verifyToken, (req, res) => { //localhost:8080/api/admin/productos/627538fe498e9db6791b15eb
  const IDupdate = req.params.id;
  const itemUpdate = req.body.productData;
  res.send(p.updateById(IDupdate, itemUpdate))

});

//BORRAR un producto por su id 
routerProd.delete('/:id', verifyToken, (req, res) => {
    try {
        const itemId = req.params.id;
        res.send(p.deleteById(itemId))
    }
    catch (err) {
        res.status(400).json({ error: err });
    }

});

export default routerProd;