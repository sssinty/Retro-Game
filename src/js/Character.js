/**
 * Базовый класс, от которого наследуются классы персонажей
 * @property level - уровень персонажа, от 1 до 4
 * @property attack - показатель атаки
 * @property defence - показатель защиты
 * @property health - здоровье персонажа
 * @property type - строка с одним из допустимых значений:
 * swordsman
 * bowman
 * magician
 * daemon
 * undead
 * vampire
 */
export default class Character {
  constructor(level, type = 'generic') {
    // console.log(new.target.name)
    if (new.target.name === "Character") {
      throw new Error("Error, parent class creation is not available");
    }
    const typeObject = ['bowman', 'swordsman', 'magician', 'undead', 'vampire', 'daemon'];
    if (!typeObject.includes(type)) {
      throw new Error('Такого типа не существует!');
    } else {
      this.type = type;
    }
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 50;
    // TODO: выбросите исключение, если кто-то использует "new Character()"
  }
}
