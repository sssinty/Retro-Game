"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Bowman = _interopRequireDefault(require("./Bowman"));
var _Daemon = _interopRequireDefault(require("./Daemon"));
var _Magician = _interopRequireDefault(require("./Magician"));
var _Swordsman = _interopRequireDefault(require("./Swordsman"));
var _Undead = _interopRequireDefault(require("./Undead"));
var _Vampire = _interopRequireDefault(require("./Vampire"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = exports["default"] = {
  bowman: _Bowman["default"],
  daemon: _Daemon["default"],
  magician: _Magician["default"],
  swordsman: _Swordsman["default"],
  undead: _Undead["default"],
  vampire: _Vampire["default"]
};