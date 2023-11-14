import Character from '../../Character';

test('test throw ERROR at create new Character', () => {
  expect(() => { new Character(1, 'bowman')}).toThrowError('Error, parent class creation is not available');
})