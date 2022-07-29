const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// middlewares
const middlewares = require('./middlewares');

//utils
const filesys = require('./utils/filesys');

// setup
const port = process.env.PORT || 3000;
const logging = process.env.LOGGING || 'common';

// logging
filesys.checkDir(path.resolve(__dirname, '..', 'logs'));
const accessLogStream = fs.createWriteStream(path.resolve(__dirname, '..', 'logs', 'access.log'), { flags: 'a' });
app.use(morgan(logging, { stream: accessLogStream }));

// headers
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000'
}))

// routes
app.get('/', (req, res) => {
  res.json({ msg: "OK" });
});

// errors
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(port, () => { console.log(`Listening on port ${port}`) })
