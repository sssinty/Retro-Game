export default class GameState {
  constructor() {
    this.move = 0;
    this.positionedCharacters = [];
  }
  static from(object) {
    if (object) {
      return {
        move: object.move,
        positionedCharacters: object.positionedCharacters
      }
    }
    // TODO: create object
    return null;
  }
}
