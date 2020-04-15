"use strict";
exports.__esModule = true;
var NpmHelper_1 = require("./NpmHelper");
var config_1 = require("./config");
var path_1 = require("path");
var utils_library_lost_1 = require("utils-library-lost");
var helper = new NpmHelper_1["default"](new utils_library_lost_1.FileSystemHelper(), config_1.config, path_1.resolve(__dirname, "..", "dist-lib"), path_1.resolve(__dirname, "..", "src"));
helper.run();
