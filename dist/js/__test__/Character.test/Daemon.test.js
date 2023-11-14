"use strict";

var _Daemon = _interopRequireDefault(require("../../character/Daemon"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
test('properly created object', function () {
  var bowman = new _Daemon["default"](1);
  var correct = {
    attack: 10,
    defence: 10,
    health: 50,
    level: 1,
    type: 'daemon',
    radiusAttack: 4,
    radiusMove: 1
  };
  expect(bowman).toEqual(correct);
});