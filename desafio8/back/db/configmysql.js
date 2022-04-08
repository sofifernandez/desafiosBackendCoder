import _knex from "knex";

const knex = _knex({
  client: "mysql2",
  connection: {
    host: "127.0.0.1", //LOCALHOST del servidor APACHE
    port: 3306,
    user: "root",
    password: "", // si no hay password hay que ponerlo igual y dejarlo vacío
    database: "ecommerce", // base de tatos creada en phpmyadmin
  },

  pool: { min: 2, max: 8, }, // va de 0 a 10. Configuración de hilos de consulta (pública)
});

knex.schema
  .createTableIfNotExists("productos", function (table) { 
    table.increments("id").primary();
    table.string("nombre");
    table.string("tipo");
    table.float("precio");
    table.string("imagen");
    table.integer("stock");
    table.integer("quantity");
    table.integer("total");
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').defaultTo(knex.fn.now());

  })
  .then(() => {
    console.log("Tabla de productos conectada");
  })
  .catch((err) => {
    throw err;
  });

//DESCOMENTAR ESTO PARA CREAR TABLA DE PRODUCTOS

// knex('productos').insert([
//   {
//     nombre: "Quarter",
//     tipo: "anillos",
//     precio: 1700,
//     imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/anillos/quarter.png",
//     stock: 12,
//     quantity: 0,
//     total: null
//   },
//   {
//     nombre: "Patrón y Patrona",
//     tipo: "anillos",
//     precio: 2100,
//     imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/anillos/patron_a.png",
//     stock: 13,
//     quantity: 0,
//     total: null
//   },
//   {
//     nombre: "Mold",
//     tipo: "anillos",
//     precio: 1700,
//     imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/anillos/mold2.png",
//     stock: 4,
//     quantity: 0,
//     total: null
//   },
//   {
//     nombre: "Drop, Egg & Line",
//     tipo: "anillos",
//     precio: 1700,
//     imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/anillos/dropEggLine.png",
//     stock: 13,
//     quantity: 0,
//     total: null
//   },
//   {
//     nombre: "Line",
//     tipo: "aros",
//     precio: 1700,
//     imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/aros/line.png",
//     stock: 12,
//     quantity: 0,
//     total: null
//   },
//   {
//     nombre: "Quarter",
//     tipo: "aros",
//     precio: 1900,
//     imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/aros/quarter.png",
//     stock: 5,
//     quantity: 0,
//     total: null
//   },
//   {
//     nombre: "Quarter Long",
//     tipo: "aros",
//     precio: 2100,
//     imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/aros/quarter_long.png",
//     stock: 3,
//     quantity: 0,
//     total: null
//   },
//   {
//     nombre: "Solid",
//     tipo: "aros",
//     precio: 2000,
//     imagen: "https://raw.githubusercontent.com/Sofia-Microb/JavaScript-Proyecto/ac1f9db41714c13de4f3230e3dd9f2ce20089fbd/imagenes/aros/solid.png",
//     stock: 14,
//     quantity: 0,
//     total: null
//   }
// ])
//   .then(() => {
//     console.log("Productos agregados");
//   })
//   .catch((err) => {
//     throw err;
//   });


export default knex;