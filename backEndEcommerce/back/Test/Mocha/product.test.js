import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const server = 'http://localhost:8080';

export default class TestProductos {
    constructor() {
        this.productos = [];
    }

    //GET PRODUCTS
    getAll = async () => {
        try {
            const res = await axios.get(`${server}/api/productos`)
            res.data.map((prod) => {
                this.productos.push(prod);
            });
        } catch (err) {
            console.log(err);
        }
    }

    //GET PRODUCTS by ID 
    getById = async (id) => {
        try {
            const res = await axios.get(`${server}/api/productos/${id}`);
            this.productos.push(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }


    //-->AGREGAR productos al listado
    addOne = async (prod) => {
        try {
            const res = await axios.post(`${server}/api/productos`, prod)
            this.productos.push(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    //-->ACTUALIZAR un producto por su id 
    updateOne = async (id, prod) => {
        try {
            const res = await axios.put(`${server}/api/productos/${id}`, prod)
            this.productos = this.productos.filter((p) => p.sku != id);
            this.productos.push(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    //BORRAR un producto por su id 
    deleteOne = async (id) => {
        try {
            await axios.delete(`${server}/api/productos/${id}`)
            this.productos = this.productos.filter((p) => p.id != id);
        } catch (err) {
            console.log(err);
        }
    }
}
