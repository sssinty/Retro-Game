export default class GameState {
  constructor() {
    this.move = 0;
    this.positionedCharacters = [];
    this.condition = 'live'
  }
  static from(object) {
    if (object) {
      return {
        move: object.move,
        positionedCharacters: object.positionedCharacters,
        condition: object.condition
      }
    }
    // TODO: create object
    return null;
  }
}
