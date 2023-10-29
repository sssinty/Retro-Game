import { generateTeam, getRandomNumb} from './generators';
import character from './character/character';
import PositionedCharacter from './PositionedCharacter';
import GameState from './GameState';
import GamePlay from './GamePlay';
import cursors from './cursors'

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.state = new GameState();
    this.activeCharacter = null;
  }

  init() {
    this.gamePlay.drawUi('mountain');
    this.crateCharacter();
    this.registrationEvents();
  }

  crateCharacter() {
    const player = generateTeam([character.bowman, character.swordsman, character.magician], 3, 2);
    const enamy = generateTeam([character.vampire, character.daemon, character.undead], 3, 2);
    const arrPosition = [];

    player.forEach((character) => {
      const playerArrayPosition = createPosition(0, this.gamePlay.boardSize - 1, 0, 1, this.gamePlay.boardSize, arrPosition);
      const positionedCharacters = new PositionedCharacter(character, playerArrayPosition);
      this.state.positionedCharacters.push(positionedCharacters);
      positionedCharacters.isPlayer = true;
      arrPosition.push(positionedCharacters);
    })

    enamy.forEach((character) => {
      const enamyArrayPosition = createPosition(0, this.gamePlay.boardSize - 1, this.gamePlay.boardSize - 2, this.gamePlay.boardSize - 1, this.gamePlay.boardSize, arrPosition);
      const positionedCharacters = new PositionedCharacter(character, enamyArrayPosition);
      positionedCharacters.isPlayer = false;
      this.state.positionedCharacters.push(positionedCharacters);
      arrPosition.push(positionedCharacters);
    });

    this.gamePlay.redrawPositions(arrPosition);

    function createPosition(minString, maxString, minColumn, maxColumn, boardSize, usedPosition) {
      let position;
      let index = 0;

      while ((!position || usedPosition.includes(position)) && index < 1000) {
        let string = getRandomNumb(minString, maxString);
        let column = getRandomNumb(minColumn, maxColumn);

        position = string * boardSize + column;
        index += 1;
      }

      return position;
    }
  }
  registrationEvents() {
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  onCellClick(index) {  
    const elem = this.gamePlay.cells[index];
    this.state.positionedCharacters.forEach((element) => {
      if (element.position === index && !element.isPlayer) {
         GamePlay.showError('Персонаж противника недоступен!');
      }
      if (element.position === index && element.isPlayer) {
        this.gamePlay.cells.forEach((cell, i) => {
          if (cell.className.indexOf('selected-yellow') > -1) {
            this.gamePlay.deselectCell(i);
          } else {
            this.selectCharacter(elem, index);
          }
        });
      }});
    // TODO: react to click
  }

  static massage(value) {
    return `\u{1F396} ${value.character.level} \u2694 ${value.character.attack} \u{1F6E1} ${value.character.defence} \u2764 ${value.character.health}`
  }

  onCellEnter(index) {
    const cell = this.gamePlay.cells[index];
    const character = cell.querySelector('.character');

    if (this.state.move % 2 === 0 && character) {
      this.state.positionedCharacters.forEach((element) => {
        if (element.position === index) {
          if (element.isPlayer && this.activeCharacter) {
            this.gamePlay.setCursor(cursors.pointer);
          }
          if (!element.isPlayer && this.activeCharacter) {
            this.gamePlay.setCursor(cursors.crosshair);
            this.gamePlay.selectCell(index, 'red');
          }
          this.gamePlay.showCellTooltip(GameController.massage(element), index);
        }
      });
    }
    if (this.state.move % 2 === 0 && this.activeCharacter) {
      if (this.activeCharacter) {
        this.gamePlay.selectCell(index, 'green');
        if (!this.activeCharacter) {
          this.gamePlay.setCursor(cursors.auto);
          this.gamePlay.deselectCell(index)
        }
      }
    }
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
    this.gamePlay.setCursor(cursors.pointer);
    this.gamePlay.cells[index].classList.remove('selected-green');
    this.gamePlay.cells[index].classList.remove('selected-red');
    // TODO: react to mouse leave
  }

  selectCharacter(elem, index) {
    this.activeCharacter = elem;
    this.gamePlay.selectCell(index);
  }

  goPlayer() {
    
  }
}
