"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOutputFolder = void 0;
const path_1 = __importDefault(require("path"));
var fs = require('fs');
const createOutputFolder = () => {
    const outputPath = path_1.default.join(__dirname, '..', '..', 'outputs');
    // Check if the folder exists
    return fs.access(outputPath, (err) => {
        if (err && err.code === 'ENOENT') {
            // Folder doesn't exist, create it
            fs.mkdir(outputPath, (err) => {
                if (err) {
                    console.error('Error creating output folder:', err);
                }
                else {
                    console.log('Output folder created');
                }
                //   next();
            });
        }
        else if (err) {
            console.error('Error accessing output folder:', err);
            // next();
        }
        else {
            // Folder already exists
            // next();
            console.log('Folder already exists');
        }
    });
};
exports.createOutputFolder = createOutputFolder;
(0, exports.createOutputFolder)();
