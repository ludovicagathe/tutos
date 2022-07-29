const path = require('path');
const fs = require('fs');
// initialise folders
function checkDir(dirname) {
  if(!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, true);
    console.log("Log directory initialised");
  }
}

module.exports = {
  checkDir
}
