"use strict";

var _Undead = _interopRequireDefault(require("../../character/Undead"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
test('properly created object', function () {
  var undead = new _Undead["default"](1);
  var correct = {
    attack: 40,
    defence: 10,
    health: 50,
    level: 1,
    type: 'undead',
    radiusAttack: 1,
    radiusMove: 4
  };
  expect(undead).toEqual(correct);
});