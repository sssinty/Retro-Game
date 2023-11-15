import Character from '../../Сharacter';
import Bowman from '../../сharacters/Bowman';
import Magician from '../../сharacters/Magician';

test('', () => {
  expect(new Bowman(1).getDamage(new Magician(1))).toBe(2.5);
});

test('', () => {
  const bowman = new Bowman(1, 'dafsa');
  expect(() => bowman).toThrowError('Такого типа не существует!');
});

test.each([
  [3, 'magician', new Error('Error, parent class creation is not available')],
  [1, 'magician', new Error('Error, parent class creation is not available')],
])('test throw ERROR at create new Character', (level, type, expected) => {
  function result() {
    new Character(level, type);
  }
  expect(result).toThrow(expected);
});