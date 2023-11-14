"use strict";

var _Character = _interopRequireDefault(require("../../Character"));
var _Bowman = _interopRequireDefault(require("../../character/Bowman"));
var _Magician = _interopRequireDefault(require("../../character/Magician"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
test('', function () {
  expect(new _Bowman["default"](1).getDamage(new _Magician["default"](1))).toBe(2.5);
});
test('', function () {
  expect(function () {
    new _Bowman["default"](1, 'dafsa');
  }).toThrowError('Такого типа не существует!');
});
test.each([[3, 'magician', new Error('Error, parent class creation is not available')], [1, 'magician', new Error('Error, parent class creation is not available')]]) // eslint-disable-next-line
('test throw ERROR at create new Character', function (level, type, expected) {
  function result() {
    new _Character["default"](level, type);
  }
  expect(result).toThrow(expected);
});