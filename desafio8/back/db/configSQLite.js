import _knex from "knex";

const knex = _knex({
    client: "better-sqlite3",
    connection: {
        filename: "./db/DB.sqlite.db3",
    },

    pool: { min: 2, max: 8, }
});


knex.schema
    .createTableIfNotExists("chats", function (table) {
        table.increments("id").primary();
        table.string("author");
        table.float("text");
        table.timestamp('created_at').defaultTo(knex.fn.now());

    })
    .then(() => {
        console.log("Tabla de chats conectada");
    })
    .catch((err) => {
        throw err;
    });



// ASÍ SUBÍ LOS PRIMEROS CHATS
// knex('chats').insert([
//   {
//     author: "Sofi",
//     text: "HOLA Mundo!!",
//   },
//     {
//     author: "Sofi",
//     text: "CHAU Mundo!!",
//   }
// ])
//   .then(() => {
//     console.log("Chats cargados");
//   })
//   .catch((err) => {
//     throw err;
//   });


export default knex;