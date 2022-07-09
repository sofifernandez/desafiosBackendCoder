import UserMongo from './DAOS/mongo/user.mongo.service.js'
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const { db } = argv || 'sqlite';

let Instancia;
switch (db) {
    // case 'sqlite':
    //     Instancia = new OrdenesSqlite();  
    // break;
    case 'mongo':
        Instancia = new UserMongo();
        break;
}

export default class InstanciaFactory {
  static initInstancia() {
    return Instancia;
  }
}