import Character from '../character/Character';

export default class Bowman extends Character {
  constructor(level, type = 'Bowman') {
    super(level, type);
    this.attack = 25;
    this.defence = 25;
  }
}
