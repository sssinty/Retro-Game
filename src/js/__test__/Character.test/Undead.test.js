import Undead from "../../character/Undead";
test('properly created object', () => {
    const undead = new Undead(1)
    const correct = {attack: 40, defence: 10, health: 50, level: 1, type: 'undead', radiusAttack: 1, radiusMove: 4}
    expect(undead).toEqual(correct);
})