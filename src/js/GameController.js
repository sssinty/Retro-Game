import { generateTeam, getRandomNumb } from './generators';
import character from './character/character';
import PositionedCharacter from './PositionedCharacter';
import GameState from './GameState';
import GamePlay from './GamePlay';
import cursors from './cursors';
import { getThemes }from './themes';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.state = new GameState();
    this.activeCharacter = null;
  }

  init() {
    const player = generateTeam([character.bowman, character.swordsman, character.magician], 1, 2);
    const enamy = generateTeam([character.vampire, character.daemon, character.undead], 1, 2);
    this.gamePlay.drawUi(getThemes()[0]);
    this.crateCharacter(player, enamy, []);
    this.registrationEvents();
  }

  crateCharacter(player, enamy, arrPosition) {
    player.forEach((character) => {
      const playerArrayPosition = createPosition(0, this.gamePlay.boardSize - 1, 0, 1, this.gamePlay.boardSize, arrPosition);
      const positionedCharacters = new PositionedCharacter(character, playerArrayPosition);
      positionedCharacters.isPlayer = true;
      positionedCharacters.condition = 'live';
      this.state.positionedCharacters.push(positionedCharacters);
      arrPosition.push(positionedCharacters);
    })
    enamy.forEach((character) => {
      const enamyArrayPosition = createPosition(0, this.gamePlay.boardSize - 1, this.gamePlay.boardSize - 2, this.gamePlay.boardSize - 1, this.gamePlay.boardSize, arrPosition);
      const positionedCharacters = new PositionedCharacter(character, enamyArrayPosition);
      positionedCharacters.isPlayer = false;
      positionedCharacters.condition = 'live';
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
    this.gamePlay.addNewGameListener(this.onNewGame.bind(this));
  }

  onNewGame() {
    this.activeCharacter = null;
    this.state = new GameState();

    this.init();
  }

  onCellClick(index) {  
    if (this.fieldActivity) {
      return
    }

    const elem = this.gamePlay.cells[index];
    const character = elem.querySelector('.character');
  
      if (this.state.move % 2 === 0 && character && !this.activeCharacter) {
        this.state.positionedCharacters.forEach((element) => {
          if (element.position === index && !element.isPlayer) {
            GamePlay.showError('Персонаж противника недоступен!');
          }
          if (element.position === index && element.isPlayer) {
            this.gamePlay.cells.forEach((cell, i) => {
            if (cell.className.indexOf('selected-yellow') > -1) {
              this.gamePlay.deselectCell(i);
            } else {
              this.selectCharacter(element, index);
            }
          });
        }
      });

    } else if (this.state.move % 2 === 0 && character && this.activeCharacter) {
      this.state.positionedCharacters.forEach((elem) => {
        if (elem.position === index && !elem.isPlayer && this.activeCharacter.calculationRadiusAttack(index, this.gamePlay.boardSize)) {
          const damage = this.activeCharacter.character.getDamage(elem.character);
          if (elem.character.health - damage > 0) {
            elem.character.health = elem.character.health - damage;
          } else {
            this.state.positionedCharacters = this.state.positionedCharacters.filter(character => character.position !== elem.position);
          }
          this.gamePlay.showDamage(index, damage).then(() => {
            this.gamePlay.deselectCell(this.activeCharacter.position);
            this.removeSelect(index, this.state.positionedCharacters.filter(character => character.condition !== 'death'));
          });
        } else if (elem.position === index && elem.isPlayer) {
          this.gamePlay.cells.forEach((cell, i) => {
            if (cell.className.indexOf('selected-yellow') > -1) {
              this.gamePlay.deselectCell(i);
            } else {
              this.selectCharacter(elem, index);
            }
          });
        }
      });
    } else if (this.state.move % 2 === 0 && this.activeCharacter && this.activeCharacter.calculationRadiusMove(index, this.gamePlay.boardSize)) {
      this.state.positionedCharacters.forEach((elem) => {
        if (elem.position === this.activeCharacter.position) {
          this.gamePlay.deselectCell(this.activeCharacter.position);
         elem.position = index;
        }
      });
      this.removeSelect(index, this.state.positionedCharacters.filter((character) => character.condition !== 'death'));
    } 
    // TODO: react to click
  }

  static massage(value) {
    return `\u{1F396} ${value.character.level} \u2694 ${value.character.attack} \u{1F6E1} ${value.character.defence} \u2764 ${value.character.health}`
  }

  onCellEnter(index) {
    if (this.fieldActivity) {
      return
    }
    const cell = this.gamePlay.cells[index];
    const character = cell.querySelector('.character');

    if (this.state.move % 2 === 0 && character) {
      this.state.positionedCharacters.forEach((element) => {
        if (element.position === index) {
          this.gamePlay.showCellTooltip(GameController.massage(element), index);
          
          if (!element.isPlayer && this.activeCharacter) {
            if (this.activeCharacter.calculationRadiusAttack(index, this.gamePlay.boardSize) === true) {
              this.gamePlay.setCursor(cursors.crosshair);
              this.gamePlay.selectCell(index, 'red');
            } else {
              this.gamePlay.setCursor(cursors.notallowed);
            }
          } else if (!this.activeCharacter) {
            this.gamePlay.setCursor(cursors.auto);
            this.gamePlay.deselectCell(index);
          }
        }
      });
    } else if (this.state.move % 2 === 0 && this.activeCharacter) {
      if (this.activeCharacter.calculationRadiusMove(index, this.gamePlay.boardSize)) {
        this.gamePlay.selectCell(index, 'green');
      } else {
        this.gamePlay.setCursor(cursors.notallowed);
      }
    } else if (!this.activeCharacter) {
      this.gamePlay.setCursor(cursors.auto);
      this.gamePlay.deselectCell(index);
    }
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    if(this.fieldActivity) {
      return
    }

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

  removeSelect(index, arrCharacter) {
    this.gamePlay.redrawPositions(arrCharacter);
    this.onCellLeave(index);
    this.state.move += 1;
    this.activeCharacter = null;
    if (this.state.move % 2 != 0) {
      this.goEnamy();
    }
  }

  upLevel(numbOfCharacters) {
    this.state.levelGame += 1;
    this.activeCharacter = null;
    this.state.move = 0;
    
    this.gamePlay.drawUi(getThemes()[this.state.levelGame])

    const newCharacterPlayer = generateTeam([character.bowman, character.swordsman, character.magician], this.state.levelGame + 1, numbOfCharacters - this.state.positionedCharacters.length);
    const newCharacterEnamy = generateTeam([character.vampire, character.daemon, character.undead], this.state.levelGame + 1, numbOfCharacters);


    this.state.positionedCharacters.forEach((element) => {
      if(element.condition === 'live') {
        element.character.level += 1;
        element.character.attack = Math.max(element.character.attack, element.character.attack * (80 + element.character.health) / 100);
        element.character.attack = Math.max(element.character.defence, element.character.defence * (80 + element.character.health) / 100);
        if(element.character.health + 80 > 100) {
          element.character.health = 100;
        } else {
          element.character.health +=  80;
        }
      } else {
        element.character.health = 50;
      }
    });

    this.state.positionedCharacters.forEach((element) => {
      console.log(this.state.positionedCharacters)
      newCharacterPlayer.push(element.character);
    });

    this.state.positionedCharacters = [];
    this.crateCharacter(newCharacterPlayer, newCharacterEnamy, []);
    this.gamePlay.redrawPositions(this.state.positionedCharacters);
  }

  goEnamy() {
    let characterEnamy = [];
    let characterPlayer = [];
    let step = false;
    let skippPosition = [];
    let availablePosition = {};

    this.state.positionedCharacters.forEach((character) => {
      skippPosition.push(character.position);
    })

    this.state.positionedCharacters.forEach((character) => {
      if(!character.isPlayer) {
        characterEnamy.push(character);
      } else if (character.condition === 'live'){
        characterPlayer.push(character);
      }
    });

    if(characterEnamy.length === 0) {
      if(this.state.levelGame === 3) {
        this.state.victory += 1;
        this.fieldActivity = true;
      } else {
        this.state.victory += 1;
        this.upLevel(3);
      }
    }
    characterEnamy.sort((a,b) => a.character.level - b.character.level);
    characterPlayer.sort((a,b) => a.character.level - b.character.level);


    characterEnamy.forEach((enamy, index) => {
      availablePosition[index] = [];
      for(let i = 0; i < this.gamePlay.boardSize ** 8; i += 1) {
        if(enamy.calculationRadiusMove(i, this.gamePlay.boardSize) && !skippPosition.includes(i) && i !== enamy.position) {
          availablePosition[index].push(i);
        }
      }
    }) 
    
    characterEnamy.forEach((heroEnamy) => {
      characterPlayer.forEach((heroPlayer) => {
        if(step) {
          return
        }

        if(heroEnamy.calculationRadiusAttack(heroPlayer.position, this.gamePlay.boardSize)) { 
          step = true
          this.activeCharacter = heroEnamy;
          this.gamePlay.selectCell(this.activeCharacter.position);
          this.gamePlay.selectCell(heroPlayer.position, 'red');
          const damage = this.activeCharacter.character.getDamage(heroPlayer.character);
          if(heroPlayer.character.health - damage > 0) {
            heroPlayer.character.health = heroPlayer.character.health - damage;
          } else {
            this.state.positionedCharacters.forEach((character) => {
              if(character.position === heroPlayer.position) {
                character.condition = 'death';
              }
            });

            characterPlayer = characterPlayer.filter((characterPosition) => characterPosition.position !== heroPlayer.position);
          }
          this.gamePlay.showDamage(heroPlayer.position, damage).then(() => {
            this.gamePlay.deselectCell(this.activeCharacter.position);
            this.gamePlay.deselectCell(heroPlayer.position);
            this.removeSelect(this.activeCharacter.position, this.state.positionedCharacters.filter(character => character.condition !== 'death'));
          });

          if(characterPlayer.length === 0) {
            this.state.defeat += 1;
            this.fieldActivity = true;
          }
        }
      });
    });

    if(step) {
      return
    }

    characterEnamy.forEach((enamy, index) => {
      console.log(availablePosition)
      availablePosition[index].forEach((newPosition) => {
        characterPlayer.forEach((player) => {
          if (step) {
            return
          }
          let pastPosition = enamy.position;
          enamy.position = newPosition;
          if (enamy.calculationRadiusAttack(player.position, this.gamePlay.boardSize)) {
            step = true;
            this.gamePlay.selectCell(newPosition, 'green');
            enamy.position = pastPosition;
            this.activeCharacter = enamy;
            this.gamePlay.selectCell(this.activeCharacter.position);
            this.activeCharacter.position = newPosition;

            this.gamePlay.deselectCell(pastPosition);
            this.removeSelect(this.activeCharacter.position, this.state.positionedCharacters);

          } else {
            step = true;
            enamy.position = pastPosition;

            let randomIndexCharcter = getRandomNumb(0, characterEnamy.length - 1);
            let randomIndexPosition = getRandomNumb(0, availablePosition[randomIndexCharcter].length - 1);
            let randomPosition = availablePosition[randomIndexCharcter][randomIndexPosition];

            this.activeCharacter = characterEnamy[randomIndexCharcter];
            this.gamePlay.selectCell(this.activeCharacter.position);
            console.log(randomPosition)
            this.gamePlay.selectCell(randomPosition, 'green');

            this.state.positionedCharacters.forEach((elem) => {
              if(elem.position === this.activeCharacter.position) {
                this.gamePlay.deselectCell(this.activeCharacter.position);
                elem.position = randomPosition;
                this.gamePlay.deselectCell(randomPosition);
              }
            });
            this.removeSelect(randomPosition, this.state.positionedCharacters.filter(character => character.condition !== 'death'));
          }
        });
      });
    });

    if(characterPlayer.length === 0) {
      this.state.defeat += 1;
      this.fieldActivity = true;
    }
  }
}
