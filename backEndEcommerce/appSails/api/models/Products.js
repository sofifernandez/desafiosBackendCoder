/**
 * Products.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nombre: {
      type: 'String',
    },
    tipo: {
      type: 'String',
    },
    precio: {
      type: 'Number',
    },
    imagen: {
      type: 'String',
    },
    stock: {
      type:'Number',
    },
    quantity: {
      type: 'Number',
    },
    total: {
      type: 'Number',
    }

  },

};

