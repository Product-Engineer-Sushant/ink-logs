"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoLog = exports.warningLog = exports.errorLog = exports.successLog = void 0;
const chalk_1 = __importDefault(require("chalk"));
const log = console.log;
const colors = {
    SUCCESS: chalk_1.default.greenBright.bold,
    ERROR: chalk_1.default.redBright.bold,
    WARNING: chalk_1.default.yellowBright.bold,
    INFO: chalk_1.default.cyanBright.bold,
};
const MAX_WIDTH = 80;
const wrapText = (text, prefixLength) => {
    const availableWidth = MAX_WIDTH - prefixLength;
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    for (const word of words) {
        if ((currentLine + word).length <= availableWidth) {
            currentLine += word + '';
        }
        else {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
        }
    }
    if (currentLine)
        lines.push(currentLine.trim());
    return lines;
};
const handler = (msg, action) => {
    const color = colors[action];
    const dash = '-'.repeat(MAX_WIDTH);
    const prefix = `${action} - `;
    const msgLines = wrapText(msg, prefix.length);
    log('\n' + color(dash));
    msgLines.forEach((line, index) => {
        const prefixText = index === 0 ? prefix : ' '.repeat(prefix.length);
        const fullLine = prefixText + line;
        const paddedLine = fullLine.padEnd(MAX_WIDTH, ' ');
        log(color(paddedLine));
    });
    log(color(dash));
};
const successLog = (msg = "Operation Completed Successfully") => {
    handler(msg, "SUCCESS");
};
exports.successLog = successLog;
const errorLog = (msg = "Something went wrong during execution") => {
    handler(msg, "ERROR");
};
exports.errorLog = errorLog;
const warningLog = (msg = "Potential issue identified") => {
    handler(msg, "WARNING");
};
exports.warningLog = warningLog;
const infoLog = (msg = "Just a heads up") => {
    handler(msg, "INFO");
};
exports.infoLog = infoLog;
(0, exports.warningLog)();
