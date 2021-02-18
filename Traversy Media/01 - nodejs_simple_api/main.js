const http = require('http');

const PORT = process.env.PORT || 5050;
const { getAllProducts, getProduct } = require('./controllers/productController');

const server = http.createServer((req, res) => {
  if(req.method === 'GET'){
    switch(true) {
      case /^\/api\/products$/.test(req.url):
        getAllProducts(req, res);
        break;
      case /^\/api\/product\/\d+$/.test(req.url):
        getProduct(req, res);
        break;
      default:
        res.writeHead(403, {"Content-Type": "text/html"});
        res.end('<h1>You cannot access this content</h1>');
        break;
    }
  } else {
    switch(req.url) {
      // case '/api/products':
      //   res.writeHead(200, {"Content-Type": "application/json"});
      //   res.end(JSON.stringify(products));
      //   break;
      default:
        res.writeHead(403, {"Content-Type": "text/html"});
        res.end('<h1>You cannot access this content</h1>');
        break;
    }
  }
});

server.listen(PORT, () => console.log('Simple API running on ' + PORT));
