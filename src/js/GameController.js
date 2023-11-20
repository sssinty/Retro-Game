import { generateTeam, getRandomNumb } from './generators';
import characters from './сharacters/Character';
import PositionedCharacter from './PositionedCharacter';
import GameState from './GameState';
import GamePlay from './GamePlay';
import cursors from './cursors';
import { getThemes } from './themes';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.state = new GameState();
    this.activeCharacter = null;
  }

  init() {
    this.gamePlay.drawUi(getThemes(0));

    const player = generateTeam([characters.bowman, characters.swordsman, characters.magician], 1, 2);
    const enamy = generateTeam([characters.vampire, characters.daemon, characters.undead], 1, 2);
    const usedPosition = [];
    this.createCharacter(player, enamy, usedPosition);
    this.registrationEvents();
  }

  createCharacter(player, enamy, arrPosition) {
    function createPosition(minString, maxString, minColumn, maxColumn, boardSize, usedPosition) {
      let position;
      let index = 0;

      while ((!position || usedPosition.some((elem) => elem.position === position)) && index < boardSize ** 2) {
        const string = getRandomNumb(minString, maxString);
        const column = getRandomNumb(minColumn, maxColumn);

        position = string * boardSize + column;
        index += 1;
      }
      return position;
    }

    [...player, ...enamy].forEach((character) => {
      if (['vampire', 'daemon', 'undead'].includes(character.type)) {
        const enamyArrayPosition = createPosition(0, this.gamePlay.boardSize - 1, this.gamePlay.boardSize - 2, this.gamePlay.boardSize - 1, this.gamePlay.boardSize, arrPosition);
        const positionedCharacters = new PositionedCharacter(character, enamyArrayPosition);

        positionedCharacters.isPlayer = false;
        positionedCharacters.condition = 'live';
        this.state.positionedCharacters.push(positionedCharacters);
        arrPosition.push(positionedCharacters);
      } else {
        const playerArrayPosition = createPosition(0, this.gamePlay.boardSize - 1, 0, 1, this.gamePlay.boardSize, arrPosition);
        const positionedCharacters = new PositionedCharacter(character, playerArrayPosition);

        positionedCharacters.isPlayer = true;
        positionedCharacters.condition = 'live';
        this.state.positionedCharacters.push(positionedCharacters);
        arrPosition.push(positionedCharacters);
      }
    });

    this.gamePlay.redrawPositions(arrPosition);
  }

  registrationEvents() {
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addNewGameListener(this.onNewGame.bind(this));
    this.gamePlay.addSaveGameListener(this.onSaveGameListner.bind(this));
    this.gamePlay.addLoadGameListener(this.onLoadGameListner.bind(this));
  }

  onNewGame() {
    this.state.fieldActivityBlock = false;
    this.activeCharacter = null;
    this.state = new GameState();

    this.init();
  }

  onSaveGameListner() {
    this.stateService.save(this.state);
  }

  onLoadGameListner() {
    const newState = GameState.from(this.stateService.load());
    for (const key in newState) {
      this.state[key] = newState[key];
    }
    this.state.positionedCharacters = this.state.positionedCharacters.map((elem) => {
      const character = new characters[elem.character.type](elem.character.level);
      character.attack = elem.character.attack;
      character.defence = elem.character.defence;
      character.health = elem.character.health;

      const newPositionedCharacter = new PositionedCharacter(character, elem.position);

      newPositionedCharacter.isPlayer = elem.isPlayer;
      newPositionedCharacter.condition = elem.condition;

      return newPositionedCharacter;
    });

    this.activeCharacter = null;
    this.gamePlay.drawUi(getThemes([this.state.levelGame]));
    this.gamePlay.redrawPositions(this.state.positionedCharacters.filter((character) => character.condition !== 'death'));
  }

  onCellClick(index) {
    if (this.state.fieldActivityBlock) {
      return;
    }

    const elemnt = this.gamePlay.cells[index];
    const character = elemnt.querySelector('.character');

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
            elem.character.health -= damage;
          } else {
            this.state.positionedCharacters = this.state.positionedCharacters.filter((hero) => hero.position !== elem.position);
          }
          this.gamePlay.showDamage(index, damage).then(() => {
            this.gamePlay.deselectCell(this.activeCharacter.position);
            this.removeSelect(index, this.state.positionedCharacters.filter((hero) => hero.condition !== 'death'));
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
      this.removeSelect(index, this.state.positionedCharacters.filter((hero) => hero.condition !== 'death'));
    }
    // TODO: react to click
  }

  static massage(value) {
    return `\u{1F396} ${value.character.level} \u2694 ${value.character.attack} \u{1F6E1} ${value.character.defence} \u2764 ${value.character.health}`;
  }

  onCellEnter(index) {
    if (this.state.fieldActivityBlock) {
      return;
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
    if (this.state.fieldActivity) {
      return;
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
    if (this.state.move % 2 !== 0) {
      this.goEnamy();
    }
  }

  upLevel(numbOfCharacters) {
    this.state.levelGame += 1;
    this.activeCharacter = null;
    this.state.move = 0;

    this.gamePlay.drawUi(getThemes(this.state.levelGame));

    const newCharacterPlayer = generateTeam([characters.bowman, characters.swordsman, characters.magician], this.state.levelGame + 1, numbOfCharacters - this.state.positionedCharacters.length);
    const newCharacterEnamy = generateTeam([characters.vampire, characters.daemon, characters.undead], this.state.levelGame + 1, numbOfCharacters);

    this.state.positionedCharacters.forEach((element) => {
      if (element.condition === 'live') {
        element.character.level += 1;
        element.character.attack = Math.max((element.character.attack, element.character.attack * (80 + element.character.health)) / 100);
        element.character.attack = Math.max((element.character.defence, element.character.defence * (80 + element.character.health)) / 100);
        if (element.character.health + 80 > 100) {
          element.character.health = 100;
        } else {
          element.character.health += 80;
        }
      } else {
        element.character.health = 50;
      }
    });

    this.state.positionedCharacters.forEach((element) => {
      newCharacterPlayer.push(element.character);
    });

    this.state.positionedCharacters = [];
    this.crateCharacter(newCharacterPlayer, newCharacterEnamy, []);
    this.gamePlay.redrawPositions(this.state.positionedCharacters);
  }

  goEnamy() {
    const characterEnamy = [];
    let characterPlayer = [];
    let step = false;
    const skippPosition = [];
    const availablePosition = {};

    this.state.positionedCharacters.forEach((character) => {
      skippPosition.push(character.position);
    });

    this.state.positionedCharacters.forEach((character) => {
      if (!character.isPlayer) {
        characterEnamy.push(character);
      } else if (character.condition === 'live') {
        characterPlayer.push(character);
      }
    });

    if (characterEnamy.length === 0) {
      if (this.state.levelGame === 3) {
        this.state.victory += 1;
        this.fieldActivityBlock = true;
      } else {
        this.state.victory += 1;
        this.upLevel(3);
      }
    }
    characterEnamy.sort((a, b) => a.character.level - b.character.level);
    characterPlayer.sort((a, b) => a.character.level - b.character.level);

    characterEnamy.forEach((enamy, index) => {
      availablePosition[index] = [];
      for (let i = 0; i < this.gamePlay.boardSize ** 2; i += 1) {
        if (enamy.calculationRadiusMove(i, this.gamePlay.boardSize) && !skippPosition.includes(i) && i !== enamy.position) {
          availablePosition[index].push(i);
        }
      }
    });

    characterEnamy.forEach((heroEnamy) => {
      characterPlayer.forEach((heroPlayer) => {
        if (step) {
          return;
        }

        if (heroEnamy.calculationRadiusAttack(heroPlayer.position, this.gamePlay.boardSize)) {
          step = true;
          this.activeCharacter = heroEnamy;
          this.gamePlay.selectCell(this.activeCharacter.position);
          this.gamePlay.selectCell(heroPlayer.position, 'red');
          const damage = this.activeCharacter.character.getDamage(heroPlayer.character);
          if (heroPlayer.character.health - damage > 0) {
            heroPlayer.character.health -= damage;
          } else {
            this.state.positionedCharacters.forEach((character) => {
              if (character.position === heroPlayer.position) {
                character.condition = 'death';
              }
            });

            characterPlayer = characterPlayer.filter((characterPosition) => characterPosition.position !== heroPlayer.position);
          }
          this.gamePlay.showDamage(heroPlayer.position, damage).then(() => {
            this.gamePlay.deselectCell(this.activeCharacter.position);
            this.gamePlay.deselectCell(heroPlayer.position);
            this.removeSelect(this.activeCharacter.position, this.state.positionedCharacters.filter((hero) => hero.condition !== 'death'));
          });

          if (characterPlayer.length === 0) {
            this.state.defeat += 1;
            this.fieldActivity = true;
          }
        }
      });
    });

    if (step) {
      return;
    }

    characterEnamy.forEach((enamy, index) => {
      availablePosition[index].forEach((newPosition) => {
        characterPlayer.forEach((player) => {
          if (step) {
            return;
          }
          const pastPosition = enamy.position;
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

            const randomIndexCharcter = getRandomNumb(0, characterEnamy.length - 1);
            const randomIndexPosition = getRandomNumb(0, availablePosition[randomIndexCharcter].length - 1);
            const randomPosition = availablePosition[randomIndexCharcter][randomIndexPosition];

            this.activeCharacter = characterEnamy[randomIndexCharcter];
            this.gamePlay.selectCell(this.activeCharacter.position);
            this.gamePlay.selectCell(randomPosition, 'green');

            this.state.positionedCharacters.forEach((elem) => {
              if (elem.position === this.activeCharacter.position) {
                this.gamePlay.deselectCell(this.activeCharacter.position);
                elem.position = randomPosition;
                this.gamePlay.deselectCell(randomPosition);
              }
            });
            this.removeSelect(randomPosition, this.state.positionedCharacters.filter((hero) => hero.condition !== 'death'));
          }
        });
      });
    });

    if (characterPlayer.length === 0) {
      this.state.defeat += 1;
      this.fieldActivityBlock = true;
    }
  }
}
