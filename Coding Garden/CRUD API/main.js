const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT || 5050;

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());

app.use('/api/v1', api);
//app.use(middlewares.notFound);
//app.use(middlewares.errorHandler);

app.get('/', (req, res) => {
  res.json({
    message: "hello"
  });
});

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
