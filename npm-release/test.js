const info = require("./config");
const path = require("path");
const fs = require("fs");

console.log(fs.existsSync(path.resolve(__dirname, "config.js")));

console.log(info.version);
