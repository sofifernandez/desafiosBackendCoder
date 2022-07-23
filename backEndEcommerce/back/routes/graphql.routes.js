import { graphqlHTTP } from 'express-graphql';
import express  from 'express';
const routerGraphql = express.Router();
//ENVIRONMENT---
import schema from '../models/graphql.models.js';
import { producto, productos
        , addProduct, updateProducto, deleteProducto} from '../services/graphql.service.js';

routerGraphql.use("/",
    graphqlHTTP({
      schema,
      rootValue: {
        producto,
        productos,
        addProduct,
        updateProducto,
        deleteProducto,
      },
      graphiql: true,
    }),
  );

export default routerGraphql;