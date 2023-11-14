"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.getThemes = getThemes;
require("core-js/modules/es.object.keys.js");
var themes = {
  prairie: 'prairie',
  desert: 'desert',
  arctic: 'arctic',
  mountain: 'mountain'
};
function getThemes() {
  return Object.keys(themes);
}
var _default = exports["default"] = themes;