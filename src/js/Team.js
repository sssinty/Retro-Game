/**
 * Класс, представляющий персонажей команды
 *
 * @todo Самостоятельно продумайте хранение персонажей в классе
 * Например
 * @example
 * ```js
 * const characters = [new Swordsman(2), new Bowman(1)]
 * const team = new Team(characters);
 *
 * team.characters // [swordsman, bowman]
 * ```
 * */
export class Team {
  constructor() {
    this.storage = new Set();
  }
  add(character) {
    if (this.storage.has(character)) {
      throw new Error('Персонаж уже есть в команде!');
    }
    this.storage.add(character);
  }
  // TODO: write your logic here
}
