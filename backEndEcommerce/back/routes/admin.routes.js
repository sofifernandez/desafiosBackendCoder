import express from 'express';
import Product from '../controllers/product.controller.js';
import autorization from "../middleware/auth.middleware.js";
const p = new Product();
const routerAdmin = express.Router();


//*********************************************************************************************************
//-------- ADMIN ------------------------------------------------------------------------------------------

// LOG IN
routerAdmin.post("/", async (req, res) => {
    console.log(req.body)
    const { userName, password } = req.body;
     if (userName === "coderhouse" && password === "123456") { //localhost:8080/api/admin/login?userName=coderhouse&password=123456
        req.session.login = true; //--> si entra, el login se vuelve TRUE y en el middleware está que si tengo eso true, me puede ingresar a /restingida
        res.send(true);
    } else {
        res.send(false);
    }
});

/// LOG OUT
routerAdmin.get("/logout", (req, res) => {
  req.session.destroy((err) => { 
    if (!err) {
      res.status(200).send(false); // si no hay error
    } else {
      res.send(true);
    }
  });
});


//-->PRUEBA: ESTO FUNCIONA, SI NO ESTOY LOGGEADO NO ENTRA
routerAdmin.get('/prueba', autorization, (req, res) => { //http://localhost:8080/api/admin/prueba
       res.send('Autorizado'); 

});

//-->AGREGAR productos al listado
routerAdmin.post('/productos', autorization, (req, res) => {
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

});

//-->ACTUALIZAR un producto por su id 
routerAdmin.put('/productos/:id', autorization, (req, res) => { //localhost:8080/api/admin/productos/627538fe498e9db6791b15eb
    const IDupdate = req.params.id;
    const itemUpdate = req.body;
    res.send(p.updateById(IDupdate, itemUpdate))

});

//BORRAR un producto por su id 
routerAdmin.delete('/productos/:id', autorization, (req, res) => {
    try {
        const itemId = req.params.id;
        res.send(p.deleteById(itemId))
    }
    catch (err) {
        res.status(400).json({ error: err });
    }

});

export default routerAdmin;