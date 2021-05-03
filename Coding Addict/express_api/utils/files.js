const fs = require('fs');
const path = require('path');
require('dotenv').config();

function getJSON(file) {
  let fileContents;
  if(!file) {
    return { error: true, message: "file not specified" };
  }
  if(typeof file != 'string') {
    return { error: true, message: "file parameter should be a string" };
  }

  try {
    fileContents = fs.readFileSync(path.join(process.env.NODE_PATH, file), { encoding: 'utf8', flag: 'r' });
    if(fileContents == "") {
      return {};
    }
  } catch(e) {
    return { error: true, message: "file cannot be accessed or does not exist" };
  }
  try {
    data = JSON.parse(fileContents);
    if(data.data && data.type) {
      switch(data.type) {
        case "number":
          return Number(data.data);
          break;
        case "boolean":
          return Boolean(data.data);
          break;
        case "date":
          return new Date(data.data);
          break;
        default:
          return String(data.data);
          break;
        }
    }
    return data;
  } catch(e) {
    return { error: true, message: "data in file is invalid or corrupted" };
  }
}

function putJSON(file, data, update) {
  let dataStr;
  if(!file) {
    return { error: true, message: "file not specified" };
  }
  if(typeof file !== 'string') {
    return { error: true, message: "file should be a string" };
  }
  if(!data) {
    return { error: true, message: "data not provided" };
  }
  if(typeof data == 'function') {
    return { error: true, message: "functions are not accepted" };
  }
  if(typeof data == 'object' && Object.prototype.toString.call(data) !== '[object Date]') {
    dataStr = JSON.stringify(data);
  }
  if(typeof data != 'object') {
    dataStr = JSON.stringify({ "data" : data, "type": typeof data });
  }
  if(Object.prototype.toString.call(data) === '[object Date]') {
    dataStr = JSON.stringify({ "data" : data.toISOString(), "type": "date" });
  }

  try {
    fs.writeFileSync(path.join(process.env.NODE_PATH, file), dataStr, { encoding: 'utf8', flag: 'w' });
    return { success: true };
  } catch(e) {
    console.log(e);
    return { error: true, message: 'something went wrong and the file could not be written' };
  }
}

module.exports = {
  getJSON,
  putJSON
}
