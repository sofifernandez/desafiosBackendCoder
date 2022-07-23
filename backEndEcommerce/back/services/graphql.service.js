import Product from '../services/product.service.js';
const p = Product.initInstancia();

//localhost:8080/api/graphql
export const productos = async () => {
    const productos = await p.getAll();
    return productos;
}

export const producto = async ({ id }) => {
    const producto = await p.getById(id);
    return producto;
}


export const addProduct = async ({ producto }) => {
    console.log(producto)
    const { nombre, tipo, precio, imagen, stock } = producto
    const newProd = {
        nombre,
        tipo,
        precio,
        imagen,
        stock,
    }
  const msg = await p.saveProduct(newProd)
  return msg  
};

export const updateProducto = async ({ id, producto }) => {
    console.log(id,producto)
    const msg = await p.updateById(id, producto);
    return msg
}


export const deleteProducto = async ({ id }) => {
    console.log(`Delete Productos/ Producto: ${id}`);
    const msg = await  p.deleteById(id);
    return msg;
}

//EJEMPLOS DE QUERY y MUTATION EN GRAPHIQL
// query{
//   productos{
//     nombre
//   }
// }

// query{
//   producto(id:"627538fe498e9db6791b15eb"){
//     nombre
//   }
// }

// mutation{
//   addProduct(producto:{nombre:"bla", precio:5, imagen: "http://.com", stock:10}){
//     nombre
//   }
// }

// mutation{
//   updateProducto(id:"62dc36938d7deb835713f459", producto:{precio:500})
// }

// mutation{
//   deleteProducto(id:"62dc36938d7deb835713f459")
// }
