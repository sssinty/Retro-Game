"use strict";

var _Bowman = _interopRequireDefault(require("../../character/Bowman"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
test('properly created object', function () {
  var bowman = new _Bowman["default"](1);
  var correct = {
    attack: 25,
    defence: 25,
    health: 50,
    level: 1,
    type: 'bowman',
    radiusAttack: 2,
    radiusMove: 2
  };
  expect(bowman).toEqual(correct);
});