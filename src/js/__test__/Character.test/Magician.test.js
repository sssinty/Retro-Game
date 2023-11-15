import Magician from '../../character/Magician';

test('properly created object', () => {
  const magician = new Magician(1);
  const correct = {
    attack: 10, defence: 40, health: 50, level: 1, type: 'magician', radiusAttack: 4, radiusMove: 1,
  };
  expect(magician).toEqual(correct);
});