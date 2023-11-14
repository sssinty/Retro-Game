import Character from '../../Character';
import Bowman from '../../character/Bowman';
import Magician from '../../character/Magician';

test('', () => {
  expect(new Bowman(1).getDamage(new Magician(1))).toBe(2.5);
})


test('', () => {
  expect(() => {new Bowman(1, 'dafsa')}).toThrowError('Такого типа не существует!');
})

test.each([
  [3, 'magician', new Error('Error, parent class creation is not available')],
  [1, 'magician', new Error('Error, parent class creation is not available')]
])// eslint-disable-next-line
('test throw ERROR at create new Character', (level, type, expected) => {
  function result() {
    new Character(level, type);
  }
  expect(result).toThrow(expected);
}); 