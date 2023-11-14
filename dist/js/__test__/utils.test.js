"use strict";

var _utils = require("../utils");
test('test field position', function () {
  expect((0, _utils.calcTileType)(0, 8)).toBe('top-left');
  expect((0, _utils.calcTileType)(1, 8)).toBe('top');
  expect((0, _utils.calcTileType)(7, 8)).toBe('top-right');
  expect((0, _utils.calcTileType)(63, 8)).toBe('bottom-right');
  expect((0, _utils.calcTileType)(56, 8)).toBe('bottom-left');
  expect((0, _utils.calcTileType)(60, 8)).toBe('bottom');
  expect((0, _utils.calcTileType)(8, 8)).toBe('left');
  expect((0, _utils.calcTileType)(15, 8)).toBe('right');
  expect((0, _utils.calcTileType)(12, 8)).toBe('center');
});
test('health indicator when leveling up', function () {
  expect((0, _utils.calcHealthLevel)(10)).toBe('critical');
  expect((0, _utils.calcHealthLevel)(45)).toBe('normal');
  expect((0, _utils.calcHealthLevel)(100)).toBe('high');
});