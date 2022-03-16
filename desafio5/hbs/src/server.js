const express = require('express');
const { engine } = require("express-handlebars"); 

//Configuracion servidor Express y Handlebar
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./hbs/public"));
app.set("views", "./hbs/src/views");
app.set("view engine", "hbs");

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs", 
    layoutsDir: __dirname + "/views/layouts", 
    partialsDir: __dirname + "/views/partials",
  }),
);


app.get("/", (req, res) => {
  const existencias= productos.length > 0
  res.render("main", {
    productos,
    existencias: existencias,
    cargarForm:false
  });
});


app.get("/productos", (req, res) => {
  const existencias= productos.length>0
  res.render("main", {
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


const PORT = 8080;
const server = app.listen(PORT, () =>console.log(`🚀 Server started on port http://localhost:${PORT}`),);
server.on('error', (err) => console.log(err));

