import Bowman from '../../сharacters/Bowman';

test('properly created object', () => {
  const bowman = new Bowman(1);
  const correct = {
    attack: 25, defence: 25, health: 50, level: 1, type: 'bowman',
  };
  expect(bowman).toEqual(correct);
});