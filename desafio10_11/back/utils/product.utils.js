import { faker } from '@faker-js/faker';
import uniqid from 'uniqid';

class ProductTest {
    constructor() { }

    async getTestProds() {
        try {
            const testArray = [];
            for (let i = 1; i <= 8; i++) {
                const prod = {
                    _id: uniqid(),
                    nombre: faker.commerce.productName(),
                    tipo: faker.commerce.department(),
                    precio: faker.commerce.price(),
                    imagen: faker.image.fashion(),
                    stock: 13,
                    quantity: 0,
                    total: null
                }
                testArray.push(prod);
            }
            return testArray
        } catch (err) {
            console.log(err)
        }
    }
}

export default ProductTest;


