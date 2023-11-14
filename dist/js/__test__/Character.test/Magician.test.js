"use strict";

var _Magician = _interopRequireDefault(require("../../character/Magician"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
test('properly created object', function () {
  var magician = new _Magician["default"](1);
  var correct = {
    attack: 10,
    defence: 40,
    health: 50,
    level: 1,
    type: 'magician',
    radiusAttack: 4,
    radiusMove: 1
  };
  expect(magician).toEqual(correct);
});