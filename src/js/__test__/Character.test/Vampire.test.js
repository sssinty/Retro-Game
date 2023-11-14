import Vampire from "../../character/Vampire";
test('properly created object', () => {
    const vampire = new Vampire(1)
    const correct = {attack: 25, defence: 25, health: 50, level: 1, type: 'vampire', radiusAttack: 2, radiusMove: 2}
    expect(vampire).toEqual(correct);
})