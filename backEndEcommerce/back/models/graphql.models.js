import { buildSchema } from 'graphql';


const schema = buildSchema(`
    type Producto {
        id: String
        nombre: String
        tipo: String
        precio: Int
        imagen: String
        stock: Int
        quantity: Int
        total: Int
    }
    input ProductoInput {
        nombre: String!
        tipo: String
        precio: Int!
        imagen: String!
        stock: Int!
        quantity: Int
        total: Int
    }
    input ProductoUpdateInput {
        nombre: String
        tipo: String
        precio: Int
        imagen: String
        stock: Int
        quantity: Int
        total: Int
    }
    type Query {
        productos: [Producto]
        producto(id: String!): Producto
    }
    type Mutation {
        addProduct(producto: ProductoInput): Producto
        updateProducto(id: String!, producto: ProductoUpdateInput): String
        deleteProducto(id: String!): String
    }
`);

export default  schema