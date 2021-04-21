const app = require('express')();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5050;

app.get('/', (req, res) => {
  res.send("<h1>This is a homepage</h1><h4><a href=\"about\">Go to About Page</a></h4>");
});

app.get('/about', (req, res) => {
  res.send("<h1>This is the about page</h1><h4><a href=\"/\">Go to Homepage</a></h4>");
});

app.get('/about', (req, res) => {
  res.send("<h1>This is the about page</h1><h4><a href=\"/\">Go to Homepage</a></h4>");
});

app.get('/contact', (req, res) => {
  res.send("<h1>This is the contact page</h1><h4><a href=\"/\">Go to Homepage</a></h4>");
});

app.all('*', (req, res) => {
  res.status('403').send('<h3>Unfortunately, you may not access this resource or it may not exist on this system.</h3><h4><a href=\"/contact\">Contact us on this issue</a></h4>');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
