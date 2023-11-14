"use strict";

var _Swordsman = _interopRequireDefault(require("../../character/Swordsman"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
test('properly created object', function () {
  var swordsman = new _Swordsman["default"](1);
  var correct = {
    attack: 40,
    defence: 10,
    health: 50,
    level: 1,
    type: 'swordsman',
    radiusAttack: 1,
    radiusMove: 4
  };
  expect(swordsman).toEqual(correct);
});