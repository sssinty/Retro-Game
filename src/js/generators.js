import Team from './Team';

export function getRandomNumb(min, max) {
  return Math.floor(Math.random() * (((max - min + 1)))) + min;
}
/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  for (let index = 0; index < allowedTypes.length; index += 1) {
    const numbLevl = Math.floor(Math.random() * (maxLevel - 1) + 1);
    yield new allowedTypes[index](numbLevl);
  }
  // TODO: write logic here
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const newTeam = new Team();
  const character = characterGenerator(allowedTypes, maxLevel);
  for (let i = 0; i < characterCount; i += 1) {
    newTeam.add(character.next().value);
  }
  return newTeam.storage;
}
