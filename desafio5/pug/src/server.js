const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./pug/public"));
//Configuracion PUG
app.set("views", "./pug/src/views");
app.set("view engine", "pug");

// Renderizar en /
app.get("/", (req, res) => {
    const existencias= productos.length > 0
  res.render("index", {
    productos,
    existencias: existencias,
    cargarForm:false
  });
});

app.get("/productos", (req, res) => {
  const existencias= productos.length>0
  res.render("index", {
    productos,
    existencias: existencias,
    cargarForm:true
  });
});

app.post('/productos', (req, res) => {
  const { body } = req;
    productos.push(body)
  res.redirect('/')
  
})

const PORT = 8080;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`),
);
server.on("error", (err) => console.log(err));


const productos = [                                                                                                                                                     
    {                                                                                                                                                    
      "title": "Escuadra",                                                                                                                                 
      "price": 123.45,                                                                                                                                     
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",                                     
      "id": 1                                                                                                                                              
    },                                                                                                                                                   
    {                                                                                                                                                    
      "title": "Calculadora",                                                                                                                              
      "price": 234.56,                                                                                                                                     
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",                                          
      "id": 2                                                                                                                                              
    },                                                                                                                                                   
    {                                                                                                                                                    
      "title": "Globo Terráqueo",                                                                                                                          
      "price": 345.67,                                                                                                                                     
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",                                   
      "id": 3                                                                                                                                              
    } ,
    
  // {
  //   "title": "Pizarra",
  //   "price": 200,
  //   "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/board-math-class-school-1024.png",
  //   "id":4
  //   }
  ]         