const products = require('../data/products');

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  })
}

function find(id) {
  return new Promise((resolve, reject) => {
    let product = products.filter((item) => { return item.id == id });
    if(product.length > 1) {
      product = {
        "error": true,
        "errorMessage": "Multiple products with same ID. Possible corruption of data."
      }
    } else if (product.length == 0) {
      product = {
        "empty": true,
        "description": "No products with ID " + id + " in database."
      }
    }
    resolve(product);
  })
}

module.exports = {
  findAll,
  find
}
