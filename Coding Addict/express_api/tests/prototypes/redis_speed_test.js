require('dotenv').config();
const PORT = process.env.PORT || 5050;
const redis = require('redis');
const path = require('path');
const ftools = require('../../utils/files');

let duration = Date.now();
let success = false;
let loops = 100;
let data;

function memStats() {
  let memUse = process.memoryUsage();
  for(let key in memUse) {
    console.log(`${key}: ${Math.round(memUse[key] / 1024 / 1024 * 100) / 100} MB`)
  }
}

data = ftools.getJSON('./tests/data/test_data.json');
console.log(data[0]);
console.log(ftools.putJSON('./tests/prototypes/outFile.json', 1));
console.log(process.env.NODE_PATH);

duration = Date.now() - duration;
console.log(`duration: ${duration} ms`);
memStats();
