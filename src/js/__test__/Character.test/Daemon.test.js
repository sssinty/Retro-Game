import Daemon from '../../сharacters/Daemon';

test('properly created object', () => {
  const bowman = new Daemon(1);
  const correct = {
    attack: 10, defence: 10, health: 50, level: 1, type: 'daemon',
  };
  expect(bowman).toEqual(correct);
});