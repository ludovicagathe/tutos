const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const monk = require("monk");
require('dotenv').config();
const PORT = process.env.PORT || 5050;

const app = express();
app.use(express.json());
app.use(express.urlencoded());
let request_count = 0;

let getOne = async () => {
  console.log("connecting")
  try {
    let db = monk(process.env.MONGO_URI_DEV);
    console.log("connected")
    let sample = db.get('sample');
    console.log("defined collection & before find")
    let result = await sample.findOne({ id: 1 });
    console.log("result back")
    console.log(result);
    db.close();
  } catch(e) {
    console.log(e);
  }
  return true;
}

app.get('/', async (req, res) => {
  console.log(`Req. ${++request_count} - Connected at ${new Date().toISOString()}`)
  await getOne();
  res.json({ message: "ok" });
});

app.all('*', (req, res) => {
  res.status('403').send('<h3>Unfortunately, you may not access this resource or it may not exist on this system.</h3><h4><a href=\"/contact\">Contact us on this issue</a></h4>');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
