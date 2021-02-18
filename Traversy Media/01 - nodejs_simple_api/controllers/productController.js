const Product = require('../models/productModel');

async function getAllProducts(req, res) {
  try {
    const products = await Product.findAll();

    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(products));
  } catch(err) {
    console.log(err);
  }
}

async function getProduct(req, res) {
  let product;
  let args = req.url.split('/');
  let id = parseInt(args[args.length-1]);
  let httpStatus = 404;

  if(!isNaN(id)) {
    product = await Product.find(id);
    if(product.error) {
      httpStatus = 502;
    } else {
      httpStatus = 200;
    }
  } else {
    product = {
      "error": true,
      "errorMessage": "Invalid URL or ID"
    }
    httpStatus = 404;
  }
  res.writeHead(httpStatus, {"Content-Type": "application/json"});
  res.end(JSON.stringify(product));
}

module.exports = {
  getAllProducts,
  getProduct
}
