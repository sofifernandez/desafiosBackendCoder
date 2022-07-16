import TestProductos from './product.test.js';
import { strictEqual } from 'assert';
import { productoNuevo, productoAModificar } from '../utils/producto.js';

describe('Test de CRUD de Productos', () => {
    it('Deberia Agregar un Nuevo Producto, y devolverlo', async () => {
        const prueba = new TestProductos;
        await prueba.addOne(productoNuevo);
        const producto = await prueba.getById(productoNuevo.id);
        strictEqual(productoNuevo.nombre, producto.nombre);
    });

    it('Deberia Modificar El Nombre del Producto, y devolverlo', async () => {       
        const prueba = new TestProductos;
        await prueba.updateOne(productoAModificar.id, productoAModificar);
        const producto = await prueba.getById(productoAModificar.id);
        strictEqual(productoAModificar.nombre, producto.nombre);
    });

    it('Deberia Eliminar el Producto', async () => {
        const id = '652';
        const prueba = new TestProductos;
        await prueba.deleteOne(id);
        const producto = prueba.productos.find(prod => prod.id === id);
        strictEqual(producto, undefined);
    });

    it('Deberia Traer al Menos Un Producto.', async () => {
        const prueba = new TestProductos;
        await prueba.getAll();
        let rsdo = false;
        if (prueba.productos.length > 0) {rsdo = true}
        strictEqual(rsdo, true);
    });
  
});