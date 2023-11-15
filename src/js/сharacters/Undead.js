import Character from '../Сharacter';

export default class Undead extends Character {
  constructor(level, type = 'undead') {
    super(level, type);
    this.attack = 40;
    this.defence = 10;
    this.radiusMove = 4;
    this.radiusAttack = 1;
  }
}
