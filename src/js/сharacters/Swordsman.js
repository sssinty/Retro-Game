import Character from '../Сharacter';

export default class Swordsman extends Character {
  constructor(level, type = 'swordsman') {
    super(level, type);
    this.attack = 40;
    this.defence = 10;
    this.radiusMove = 4;
    this.radiusAttack = 1;
  }
}
