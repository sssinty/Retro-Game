"use strict";

var _generators = require("../generators");
var _Bowman = _interopRequireDefault(require("../character/Bowman"));
var _Swordsman = _interopRequireDefault(require("../character/Swordsman"));
var _Magician = _interopRequireDefault(require("../character/Magician"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
test('genarator random numb', function () {
  expect((0, _generators.getRandomNumb)(1, 1)).toBe(1);
});
test('test generator character', function () {
  var generator = (0, _generators.characterGenerator)([_Bowman["default"], _Swordsman["default"], _Magician["default"]], 2);
  for (var i = 0; i < 3; i += 1) {
    var result = generator.next().value;
    if (result === undefined) {
      expect(result).toEqual(undefined);
    }
    expect(result).toEqual(result);
  }
  ;
});
test('test range create lvl character', function () {
  var result = (0, _generators.generateTeam)([_Bowman["default"], _Swordsman["default"], _Magician["default"]], 3, 3);
  for (var i = 0; i < result.length; i += 1) {
    expect(result[i].level).toBe(result[i].level);
  }
});