import CartMongo from './DAOS/mongo/cart.mongo.service.js'
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const { db } = argv || 'sqlite'; //No está implementado SQLITE, pero así se podría cargar

let Instancia;
switch (db) {
    // case 'sqlite':
    //     Instancia = new OrdenesSqlite();  
    // break;
    case 'mongo':
        Instancia = new CartMongo();
        break;
}

export default class InstanciaFactory {
  static initInstancia() {
    return Instancia;
  }
}