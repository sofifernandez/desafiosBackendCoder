//--->Cargar librerías
const express = require('express')
const Contenedor = require('./contenedor.js');

//---> Crear servidor
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 8080;
const server = app.listen(PORT, () => console.log(`🚀 Server started on port http: //localhost:8080`),);
server.on('error', (err) => console.log(err));

//---> Archivos estáticos localizados en:
app.use(express.static("public"));// -->  http://localhost:8080/index.html

//--->Setear Routers de trabajo
const routerProductos = express.Router();
app.use("/api/productos", routerProductos);

const routerNewProd = express.Router();
app.use("/api/routerNewProd", routerNewProd);



//********************************************************************************************* */
//--------------------------------------------------------------------------------------------------


//GET --> todos los productos en la dirección http://localhost:8080/api/productos
routerProductos.get('/', async (req, res) => {
  const contenedor = new Contenedor('productos.json');
  const productos = await contenedor.getAll();
  res.status(200).send(productos);
})

//GET PARAMS --> de un producto con determinado ID. Ej: http://localhost:8080/api/productos/1
routerProductos.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id)
  const contenedor = new Contenedor('productos.json');
  const producto = await contenedor.getById(id)
  if (!producto) {
     res.status(400).json({ "InternalError": 'Product Not Found.' })
  } else {
    res.status(200).send(producto);
  }
});

//PUT --> editar producto existente. Ej modificar http://localhost:8080/api/productos/1
        // body
            // {                                                                                                                                                    
            //   "title": "Escuadra-MODIFIED",                                                                                                                                 
            //   "price": 1230000,                                                                                                                                     
            //   "thumbnail": "https:Modified"                                   
            // }
routerProductos.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id)
  const {title, price, thumbnail} =req.body
  const contenedor = new Contenedor('productos.json');
  const message = await contenedor.modify(id, title, price, thumbnail)
  if (message) {
    res.status(200).send(message)
  } else {
    res.status(400).json({ "InternalError": 'Product Not Modified.'})
  }
});


//DELETE --> borrar producto con determinado ID
routerProductos.delete("/:id", async(req, res) => {
    const id = parseInt(req.params.id)
    const contenedor = new Contenedor('productos.json');
    const message= await contenedor.deleteById(id)
   if (message) {
    res.status(200).send(message)
  } else {
    res.status(400).json({ "InternalError": 'Bad Request'})
  }
});


//POST-->agregar nuevo producto
routerProductos.post('/', async(req, res) =>{
  const {title, price, thumbnail} =req.body
  const contenedor = new Contenedor('productos.json');
  const newID= await contenedor.save(title, price, thumbnail) 
  if (newID) {
    res.status(200).send(`New producto with ID=${newID} was added to the list`)
  } else {
    res.status(400).json({ "InternalError": 'Product Not Added.'})
  }
})


/* ------------------------------------------------------ */
//GUARDAR DESDE EL FORM

routerNewProd.post("/", async(req, res) => {
  const {title, price, thumbnail} =req.body
  const contenedor = new Contenedor('productos.json');
  const newID= await contenedor.save(title, price, thumbnail) 
  if (newID) {
    res.status(200).send(`New producto with ID=${newID} was added to the list from the form`)
  } else {
    res.status(400).json({ "InternalError": 'Product Not Added.'})
  }
})

