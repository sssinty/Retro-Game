import Character from '../Сharacter';

export default class Vampire extends Character {
  constructor(level, type = 'vampire') {
    super(level, type);
    this.attack = 25;
    this.defence = 25;
    this.radiusMove = 2;
    this.radiusAttack = 2;
  }
}
