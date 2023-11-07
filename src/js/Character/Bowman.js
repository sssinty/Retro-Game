import Character from '../Character';

export default class Bowman extends Character {
  constructor(level, type = 'bowman') {
    super(level, type);
    this.attack = 250;
    this.defence = 25;
    this.radiusMove = 2;
    this.radiusAttack = 20;
  }
}
