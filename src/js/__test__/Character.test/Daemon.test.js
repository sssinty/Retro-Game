import Daemon from '../../character/Daemon';

test('properly created object', () => {
  const bowman = new Daemon(1);
  const correct = {
    attack: 10, defence: 10, health: 50, level: 1, type: 'daemon', radiusAttack: 4, radiusMove: 1,
  };
  expect(bowman).toEqual(correct);
});