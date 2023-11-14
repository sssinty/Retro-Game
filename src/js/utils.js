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
export function calcTileType(index, boardSize) {
  const arr = [];
  for (let i = 0; i < boardSize ** 2; i += 1) {
    arr.push(i);
  }
  let rightSide = boardSize - 1;
  let leftSide = boardSize;
  let top = 1;
  let bottom = (boardSize ** 2) - boardSize;
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === 0) {
      if (arr[i] === index) {
        return 'top-left';
      }
    } if (arr[i] === boardSize - 1) {
      if (arr[i] === index) {
        return 'top-right';
      }
    } if (arr[i] === (boardSize ** 2 - 1)) {
      if (arr[i] === index) {
        return 'bottom-right';
      }
    } if (arr[i] === (boardSize ** 2 - boardSize)) {
      if (arr[i] === index) {
        return 'bottom-left';
      }
    } if (arr[i] === top && arr[i] !== rightSide) {
      top += 1;
      if (arr[i] === index) {
        return 'top';
      }
    } if (arr[i] === leftSide) {
      leftSide += boardSize;
      if (arr[i] === index) {
        return 'left';
      }
    } if (arr[i] === rightSide) {
      rightSide += boardSize;
      if (arr[i] === index) {
        return 'right';
      }
    } if (arr[i] === bottom) {
      bottom += 1;
      if (arr[i] === index) {
        return 'bottom';
      }
    }
  }
  return 'center';
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  } if (health < 50) {
    return 'normal';
  }
  return 'high';
}
