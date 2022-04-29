import express  from 'express';
import Product from '../controllers/product.controller.js';
const p = new Product();
const routerProd = express.Router();
const ADMIN = true 


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

//*********************************************************************************************************
//-------- ADMIN ------------------------------------------------------------------------------------------

//-->AGREGAR productos al listado
routerProd.post('/', (req, res) => {
  if (!ADMIN) {
    res.status(400).json({ error: 400, descripción: 'NO Autorizado' });
  } else {
      const { nombre, tipo, precio, imagen, stock } = req.body;
      const newProd = {
        nombre,
        tipo,
        precio,
        imagen,
        stock,
      }
    const msg = p.saveProduct(newProd)
    res.status(200).json(msg);
  }
});

//-->ACTUALIZAR un producto por su id 
routerProd.put('/:id', (req, res) => {
  if (!ADMIN) {
    res.status(400).json({ error: 400, descripción: 'NO Autorizado' });
  } else {
    const IDupdate = req.params.id;
    const itemUpdate = req.body;
    res.send(p.updateById(IDupdate, itemUpdate))
}
});

//BORRAR un producto por su id 
routerProd.delete('/:id', (req, res) => {
  if (!ADMIN) {
    res.status(400).json({ error: 400, descripción: 'NO Autorizado' });
  } else {
    try {
      const itemId = req.params.id;
    res.send(p.deleteById(itemId))
    }
    catch (err) {
       res.status(400).json({error: err});
    }
  }
});

export default routerProd;