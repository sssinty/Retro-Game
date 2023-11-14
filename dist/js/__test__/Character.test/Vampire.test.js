"use strict";

var _Vampire = _interopRequireDefault(require("../../character/Vampire"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
test('properly created object', function () {
  var vampire = new _Vampire["default"](1);
  var correct = {
    attack: 25,
    defence: 25,
    health: 50,
    level: 1,
    type: 'vampire',
    radiusAttack: 2,
    radiusMove: 2
  };
  expect(vampire).toEqual(correct);
});