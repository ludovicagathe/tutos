const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const postsRoute = require('./routes/posts');
const postRoute = require('./routes/post');

app.use(bodyParser.json());
app.use('/posts', postsRoute);
app.use('/post', postRoute);

app.get('/', (req, res) => {
  res.send('HOME');
})

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@c0.ucw3v.mongodb.net/${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', () => {
  console.error.bind(console, 'connection error:');
});
db.on('open', () => {
  console.log('\x1b[32m%s\x1b[0m', 'Connected to DB ');
  console.log('\x1b[36m%s\x1b[0m', `Connected to '${db.name}' database`);
})

console.log('\x1b[32m%s\x1b[0m', `Server running on port ${process.env.PORT}`);
app.listen(process.env.PORT);
