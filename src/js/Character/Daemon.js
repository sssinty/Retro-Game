import Character from '../character/Character';

export default class Daemon extends Character {
  constructor(level, type = 'Daemon') {
    super(level, type);
    this.attack = 10;
    this.defence = 40;
  }
}
