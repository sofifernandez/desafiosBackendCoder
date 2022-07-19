//import supertest from 'supertest'
import request from 'supertest';
const requ = request('http://localhost:8080');
import { expect } from 'chai';
import { productoNuevo } from '../utils/productos.js'


describe('Test de Productos con Supertest', () => {
    //obtener la lista de productos, enviar petición
    it('Retornar un status 200.', async () => {
        let response = await requ.get('/api/productos');
        console.log('Status:', response.status)
        expect(response.status).to.equal(200);
    });

    //agrega producto nuevo a la lista
    it('Agregar un nuevo producto, y devolverlo', async () => {
        let response = await requ.post('/api/productos').send({'productData': productoNuevo});
        console.log('Status:', response.status);
        console.log('Body:', response.body);
        expect(response.status).to.equal(200);

        const producto = response.body;
        expect(producto.nombre).to.equal(productoNuevo.nombre);
        expect(producto.tipo).to.equal(productoNuevo.tipo);
        expect(producto.precio).to.equal(productoNuevo.precio);
        expect(producto.imagen).to.equal(productoNuevo.imagen);
        expect(producto.stock).to.equal(productoNuevo.stock);
    });
});