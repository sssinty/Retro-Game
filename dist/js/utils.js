"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcHealthLevel = calcHealthLevel;
exports.calcTileType = calcTileType;
/**
 * @todo
 * @param index - индекс поля
 * @param boardSize - размер квадратного поля (в длину или ширину)
 * @returns строка - тип ячейки на поле:
 *
 * top-left
 * top-right
 * top
 * bottom-left
 * bottom-right
 * bottom
 * right
 * left
 * center
 *
 * @example
 * ```js
 * calcTileType(0, 8); // 'top-left'
 * calcTileType(1, 8); // 'top'
 * calcTileType(63, 8); // 'bottom-right'
 * calcTileType(7, 7); // 'left'
 * ```
 * */
function calcTileType(index, boardSize) {
  var arr = [];
  for (var i = 0; i < Math.pow(boardSize, 2); i += 1) {
    arr.push(i);
  }
  var rightSide = boardSize - 1;
  var leftSide = boardSize;
  var top = 1;
  var bottom = Math.pow(boardSize, 2) - boardSize;
  for (var _i = 0; _i < arr.length; _i += 1) {
    if (arr[_i] === 0) {
      if (arr[_i] === index) {
        return 'top-left';
      }
    }
    if (arr[_i] === boardSize - 1) {
      if (arr[_i] === index) {
        return 'top-right';
      }
    }
    if (arr[_i] === Math.pow(boardSize, 2) - 1) {
      if (arr[_i] === index) {
        return 'bottom-right';
      }
    }
    if (arr[_i] === Math.pow(boardSize, 2) - boardSize) {
      if (arr[_i] === index) {
        return 'bottom-left';
      }
    }
    if (arr[_i] === top && arr[_i] !== rightSide) {
      top += 1;
      if (arr[_i] === index) {
        return 'top';
      }
    }
    if (arr[_i] === leftSide) {
      leftSide += boardSize;
      if (arr[_i] === index) {
        return 'left';
      }
    }
    if (arr[_i] === rightSide) {
      rightSide += boardSize;
      if (arr[_i] === index) {
        return 'right';
      }
    }
    if (arr[_i] === bottom) {
      bottom += 1;
      if (arr[_i] === index) {
        return 'bottom';
      }
    }
  }
  return 'center';
}
function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }
  if (health < 50) {
    return 'normal';
  }
  return 'high';
}