"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var path_1 = require("path");
var NpmHelper = /** @class */ (function () {
    function NpmHelper(fs, config, pathToLibBuildDir, pathToSrc) {
        var _this = this;
        this.run = function () { return __awaiter(_this, void 0, void 0, function () {
            var data, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!this.fs.isPathExists(this.pathToLibBuildDir)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fs.deleteDir(this.pathToLibBuildDir)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: 
                    //copy src dir
                    return [4 /*yield*/, this.fs.makeDir(this.pathToLibBuildDir)];
                    case 3:
                        //copy src dir
                        _a.sent();
                        return [4 /*yield*/, this.fs.copyDir(this.pathToSrc, this.pathToLibBuildDir)];
                    case 4:
                        _a.sent();
                        //delete unused files
                        this.config.excludeFiles.forEach(function (fileName) {
                            if (_this.fs.isPathExists(path_1.resolve(_this.pathToLibBuildDir, fileName))) {
                                _this.fs.deleteFile(path_1.resolve(_this.pathToLibBuildDir, fileName));
                            }
                        });
                        this.config.excludeDirs.forEach(function (dirName) {
                            if (_this.fs.isPathExists(path_1.resolve(_this.pathToLibBuildDir, dirName))) {
                                _this.fs.deleteDir(path_1.resolve(_this.pathToLibBuildDir, dirName));
                            }
                        });
                        return [4 /*yield*/, this.fs.readFile(path_1.resolve(__dirname, "templates", "package.template.json"))];
                    case 5:
                        data = _a.sent();
                        if (data)
                            data = data.replace("!!!VERSION!!!", this.config.version);
                        this.fs.writeFile(path_1.resolve(this.pathToLibBuildDir, "package.json"), data);
                        //copy index.js
                        this.fs.copyFile(path_1.resolve(__dirname, "templates", "index.template.js"), path_1.resolve(this.pathToLibBuildDir, "index.js"));
                        //create index.d.ts
                        this.fs.copyFile(path_1.resolve(__dirname, "templates", "index.template.js"), path_1.resolve(this.pathToLibBuildDir, "index.d.ts"));
                        //copy README.md
                        this.fs.copyFile(path_1.resolve(__dirname, "templates", "README.md"), path_1.resolve(this.pathToLibBuildDir, "README.md"));
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        console.error(error_1.message);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.fs = fs;
        this.config = config;
        this.pathToLibBuildDir = pathToLibBuildDir;
        this.pathToSrc = pathToSrc;
    }
    return NpmHelper;
}());
exports["default"] = NpmHelper;
