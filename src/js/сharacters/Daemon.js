import Character from '../Сharacter';

export default class Daemon extends Character {
  constructor(level, type = 'daemon') {
    super(level, type);
    this.attack = 10;
    this.defence = 10;
    this.radiusMove = 1;
    this.radiusAttack = 4;
  }
}
