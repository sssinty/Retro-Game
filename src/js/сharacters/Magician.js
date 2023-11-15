import Character from '../Сharacter';

export default class Magician extends Character {
  constructor(level, type = 'magician') {
    super(level, type);
    this.attack = 10;
    this.defence = 40;
    this.radiusMove = 1;
    this.radiusAttack = 4;
  }
}
