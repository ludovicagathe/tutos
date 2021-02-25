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

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@c0.ucw3v.mongodb.net/`, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Connected to DB"));

console.log(`Server running on port ${process.env.PORT}`);
app.listen(process.env.PORT);
