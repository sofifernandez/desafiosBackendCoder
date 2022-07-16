//import supertest from 'supertest'
import request from 'supertest';
request = request('http://localhost:8080');
import { expect } from 'chai';
import {productoNuevo} from '../utils/productos.js'


describe('Test de CRUD de Productos con Supertest y Chai', () => {
    it('Deberia Retornar un status 200.', async () => {
        let response = await request.get('/api/productos');
        console.log('Status Respuesta', response.status)
        expect(response.status).to.equal(200);
    });

    it('Deberia Agregar un Nuevo Producto, y devolverlo', async () => {
        let response = await request.post('/api/productos').send(productoNuevo);
        console.log('Status Respuesta', response.status);
        console.log('Body Respuesta', response.body);
        expect(response.status).to.equal(200);

        const producto = response.body;
        expect(producto.nombre).to.equal(productoNuevo.nombre);
        expect(producto.tipo).to.equal(productoNuevo.tipo);
        expect(producto.precio).to.equal(productoNuevo.precio);
        expect(producto.imagen).to.equal(productoNuevo.imagen);
        expect(producto.stock).to.equal(productoNuevo.stock);
        expect(producto.quantity).to.equal(productoNuevo.quantity);
        expect(producto.total).to.equal(productoNuevo.total);
    });    
});