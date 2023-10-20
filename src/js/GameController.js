import { generateTeam } from './generators';
import Bowman from './Character/Bowman';
import Daemon from './Character/Daemon';
import Magician from './character/Magician';
import Swordsman from './character/Swordsman';
import Undead from './character/Undead';
import Vampire from './character/Vampire'
import PositionedCharacter from './PositionedCharacter';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    this.gamePlay.drawUi('prairie');
    const characterArrayPlayer1 = [Bowman, Swordsman, Magician];
    const characterArrayPlayer2 = [Vampire, Daemon, Undead];
    const player1Array = [0, 1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57]
    const character1 = generateTeam(characterArrayPlayer1, 4, 3)
    let arr = []
    for(let index = 0; index < character1.length; index++) {
      const randomIndex = Math.floor(Math.random() * player1Array.length)
      arr.push(new PositionedCharacter(character1[index], player1Array[randomIndex]))
    }
    for(let index = 0; index < character1.length; index++) {
      this.gamePlay.redrawPositions(arr[index])
    }
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
