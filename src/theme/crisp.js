exports.isDark = false;
exports.cssClass = "ace-crisp";
exports.cssText = require("./crisp.css");

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
