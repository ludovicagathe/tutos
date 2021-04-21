### SET NPM DEFAULTS (Global)
npm config set init-author-name "Ludovic Agathe" -g
npm config set init-author-email "ludovic.agathe@gmail.com" -g
npm config set init.version "0.0.1" -g
npm config set init.license "MIT" -g

### Express production modules
npm install --save body-parser morgan cors dotenv express helmet joi monk

### Express live server (nodemon)
npm install --save-dev nodemon mocha chai supertest

### .env config
PORT=3030
MONGO_URI=mongodb+srv://<USER>:<PASSWORF>@c0.ucw3v.mongodb.net/<DB>

### NPM fix global node_modules location
npm set prefix "C:\Users\User\AppData\Roaming\npm"

### Express app requires
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5050;
