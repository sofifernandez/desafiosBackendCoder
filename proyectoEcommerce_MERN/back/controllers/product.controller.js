import Product from '../services/product.service.js';
const p = Product.initInstancia();


// -------------------PRODUCTS--------------------------------//
//GET PRODUCTS
export const getAllProds= async (req, res) => {
  const productos = await p.getAll();
  res.status(200).send(productos);
}

//GET PRODUCTS by ID 
export const prodsByID = async (req, res) => {
  const id = req.params.id;
  const producto = await p.getById(id);
  if (!producto) {
    res.status(400).json({ "InternalError": 'Product Not Found.' })
  } else {
     res.status(200).send(producto);
  }
};

//GET PRODUCTS by Category
export const prodsByCat = async (req, res) => {
  console.log(req.params.categoria)
  const category = req.params.categoria;
  const producto = await p.getByCat(category);
  if (!producto) {
    res.status(400).json({ "InternalError": 'Product Not Found.' })
  } else {
     res.status(200).send(producto);
  }
};




// -------------------ADMINISTRADORES--------------------------------//
//-->AGREGAR productos al listado
export const addProduct = async (req, res) => {
    const { nombre, tipo, precio, imagen, stock } = req.body.productData;
    const newProd = {
        nombre,
        tipo,
        precio,
        imagen,
        stock,
    }
  const msg = await p.saveProduct(newProd)
  res.status(200).json(msg);
};


//-->ACTUALIZAR un producto por su id 
export const updateProd= async (req, res) => { //localhost:8080/api/admin/productos/627538fe498e9db6791b15eb
  const IDupdate = req.params.id;
  const itemUpdate = req.body.productData;
  res.send(p.updateById(IDupdate, itemUpdate))
};

//BORRAR un producto por su id 
export const deleteProdByID= async (req, res) => {
    try {
        const itemId = req.params.id;
        res.send(p.deleteById(itemId))
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
};




