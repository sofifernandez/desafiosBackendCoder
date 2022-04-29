import { faker } from '@faker-js/faker';

function generateChats() { // solo para generar los datos. ESTO SE IMPORTA EN db/createDocs
    return {
        author: {
            id: faker.internet.email(),
            nombre: faker.name.findName(),
            apellido: faker.name.lastName(),
            alias: faker.internet.email(),
            avatar: faker.image.avatar(),
        },
        text: faker.hacker.phrase()
    }
}
export default generateChats 