"use strict";

require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.number.constructor.js");
var _Character = _interopRequireDefault(require("./Character"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var PositionedCharacter = exports["default"] = /*#__PURE__*/function () {
  function PositionedCharacter(character, position) {
    _classCallCheck(this, PositionedCharacter);
    if (!(character instanceof _Character["default"])) {
      throw new Error('character must be instance of Character or its children');
    }
    if (typeof position !== 'number') {
      throw new Error('position must be a number');
    }
    this.character = character;
    this.position = position;
  }
  _createClass(PositionedCharacter, [{
    key: "calculationRadiusAttack",
    value: function calculationRadiusAttack(index, boardSize) {
      return this.calculatRadius(index, boardSize, this.character.radiusAttack);
    }
  }, {
    key: "calculationRadiusMove",
    value: function calculationRadiusMove(index, boardSize) {
      return this.calculatRadius(index, boardSize, this.character.radiusMove);
    }
  }, {
    key: "calculatRadius",
    value: function calculatRadius(index, boardSize, num) {
      var position = this.position;
      var myСolumn = position % boardSize;
      var myString = Math.floor(position / boardSize);
      var requiredСolumn = index % boardSize;
      var requiredString = Math.floor(index / boardSize);
      var differenceString = Math.abs(myString - requiredString);
      var differenceСolumn = Math.abs(myСolumn - requiredСolumn);
      if (myString === requiredString && differenceСolumn <= num) {
        return true;
      }
      if (myСolumn === requiredСolumn && differenceString <= num) {
        return true;
      }
      if (differenceString <= num && differenceСolumn <= num && differenceString === differenceСolumn) {
        return true;
      }
    }
  }]);
  return PositionedCharacter;
}();