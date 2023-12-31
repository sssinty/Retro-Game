export default class GameState {
  constructor() {
    this.move = 0;
    this.positionedCharacters = [];
    this.levelGame = 0;
    this.defeat = 0;
    this.victory = 0;
    this.fieldActivityBlock = false;
  }

  static from(object) {
    if (object) {
      return {
        move: object.move,
        positionedCharacters: object.positionedCharacters,
        levelGame: object.levelGame,
        defeat: object.defeat,
        victory: object.victory,
      };
    }
    // TODO: create object
    return null;
  }
}
