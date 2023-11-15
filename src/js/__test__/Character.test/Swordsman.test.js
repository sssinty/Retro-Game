import Swordsman from '../../character/Swordsman';

test('properly created object', () => {
  const swordsman = new Swordsman(1);
  const correct = {
    attack: 40, defence: 10, health: 50, level: 1, type: 'swordsman', radiusAttack: 1, radiusMove: 4,
  };
  expect(swordsman).toEqual(correct);
});