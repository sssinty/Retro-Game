import { characterGenerator, generateTeam, getRandomNumb } from '../generators';
import Bowman from '../сharacters/Bowman';
import Swordsman from '../сharacters/Swordsman';
import Magician from '../сharacters/Magician';

test('genarator random numb', () => {
  expect(getRandomNumb(1, 1)).toBe(1);
});

test('test generator character', () => {
  const generator = characterGenerator([Bowman, Swordsman, Magician], 2);
  for (let i = 0; i < 3; i += 1) {
    const result = generator.next().value;
    if (result === undefined) {
      expect(result).toEqual(undefined);
    }
    expect(result).toEqual(result);
  }
});

test('test range create lvl character', () => {
  const result = generateTeam([Bowman, Swordsman, Magician], 3, 3);
  for (let i = 0; i < result.length; i += 1) {
    expect(result[i].level).toBe(result[i].level);
  }
});