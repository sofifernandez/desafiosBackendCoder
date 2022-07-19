import TestProductos from './product.test.js';
import { strictEqual } from 'assert';
import { productoNuevo, productoAModificar } from '../utils/productos.js';

describe('Test de CRUD de Productos', () => {
    it('Agregar un nuevo producto, y devolverlo', async () => {
        const prueba = new TestProductos;
        const response = await prueba.addOne({'productData': productoNuevo});
        const producto = await prueba.getById(response._id);
        strictEqual(productoNuevo.nombre, producto.nombre);
    });


    it('Modificar el stock del producto Quarter', async () => {       
        const prueba = new TestProductos;
        await prueba.updateOne('627538fe498e9db6791b15eb', {'productData': productoAModificar});
        const producto = await prueba.getById('627538fe498e9db6791b15eb');
        strictEqual(productoAModificar.stock, producto.stock);
    });

    it('Eliminar el producto agregado con supertest llamado Prueba', async () => {
        const id = '62d615181f40e3ebdbd33fdc'; //el ID va variando
        const prueba = new TestProductos;
        await prueba.deleteOne(id);
        const producto = await prueba.getById(id);
        strictEqual(producto, undefined);
    });

    it('Traer los productos', async () => {
        const prueba = new TestProductos;
        const prods = await prueba.getAll();
        console.log(prods.data)
        strictEqual(prods.data.length>0, true);
    });
  
});