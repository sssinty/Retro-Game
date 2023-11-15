import Character from './Character';

export default class PositionedCharacter {
  constructor(character, position) {
    if (!(character instanceof Character)) {
      throw new Error('character must be instance of Character or its children');
    }

    if (typeof position !== 'number') {
      throw new Error('position must be a number');
    }

    this.character = character;
    this.position = position;
  }

  calculationRadiusAttack(index, boardSize) {
    return this.calculatRadius(index, boardSize, this.character.radiusAttack);
  }

  calculationRadiusMove(index, boardSize) {
    return this.calculatRadius(index, boardSize, this.character.radiusMove);
  }

  calculatRadius(index, boardSize, num) {
    const myСolumn = this.position % boardSize;
    const myString = Math.floor(this.position / boardSize);
    const requiredСolumn = index % boardSize;
    const requiredString = Math.floor(index / boardSize);
    const differenceString = Math.abs(myString - requiredString);
    const differenceСolumn = Math.abs(myСolumn - requiredСolumn);

    if (myString === requiredString && differenceСolumn <= num) {
      return true;
    }

    if (myСolumn === requiredСolumn && differenceString <= num) {
      return true;
    }

    if (differenceString <= num && differenceСolumn <= num && differenceString === differenceСolumn) {
      return true;
    }
  }
}
