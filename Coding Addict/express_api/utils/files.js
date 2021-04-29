const fs = require('fs');
const path = require('path');
require('dotenv').config();

function getJSON(file) {
  if(!file) {
    return { error: true, message: "file not specified" };
  }
  if(typeof file != 'string') {
    return { error: true, message: "file parameter should be a string" };
  }

  try {
    let fileContents = fs.readFileSync(path.join(process.env.NODE_PATH, file), { encoding: 'utf8', flag: 'r' });
    if(fileContents == "") {
      return {};
    }
    data = JSON.parse(fileContents);
    return data;
  } catch(e) {
    return { error: true, message: "file cannot be accessed or does not exist" };
  }
}

function putJSON(file, data, update) {
  let dataStr;
  if(!data) {
    return { error: true, fnf: true };
  }
  if(typeof data == 'object') {
    dataStr = JSON.stringify(data);
  }
  if(typeof data != 'object') {
    dataStr = JSON.stringify({ "data" : data, "type": typeof data });
  }

  try {
    fs.writeFileSync(path.join(process.env.NODE_PATH, file), dataStr, { encoding: 'utf8', flag: 'w' });
    return { success: true };
  } catch(e) {
    console.log(e);
    return { error: true, fnf: true };
  }
}

module.exports = {
  getJSON,
  putJSON
}
