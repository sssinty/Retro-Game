"use strict";

require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.number.constructor.js");
var _generators = require("./generators");
var _character = _interopRequireDefault(require("./character/character"));
var _PositionedCharacter = _interopRequireDefault(require("./PositionedCharacter"));
var _GameState = _interopRequireDefault(require("./GameState"));
var _GamePlay = _interopRequireDefault(require("./GamePlay"));
var _cursors = _interopRequireDefault(require("./cursors"));
var _themes = require("./themes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var GameController = exports["default"] = /*#__PURE__*/function () {
  function GameController(gamePlay, stateService) {
    _classCallCheck(this, GameController);
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.state = new _GameState["default"]();
    this.activeCharacter = null;
  }
  _createClass(GameController, [{
    key: "init",
    value: function init() {
      this.gamePlay.drawUi((0, _themes.getThemes)()[0]);
      var player = (0, _generators.generateTeam)([_character["default"].bowman, _character["default"].swordsman, _character["default"].magician], 1, 2);
      var enamy = (0, _generators.generateTeam)([_character["default"].vampire, _character["default"].daemon, _character["default"].undead], 1, 2);
      var usedPosition = [];
      this.crateCharacter(player, enamy, usedPosition);
      this.registrationEvents();
    }
  }, {
    key: "crateCharacter",
    value: function crateCharacter(player, enamy, arrPosition) {
      var _this = this;
      player.forEach(function (character) {
        var playerArrayPosition = createPosition(0, _this.gamePlay.boardSize - 1, 0, 1, _this.gamePlay.boardSize, arrPosition);
        var positionedCharacters = new _PositionedCharacter["default"](character, playerArrayPosition);
        positionedCharacters.isPlayer = true;
        positionedCharacters.condition = 'live';
        _this.state.positionedCharacters.push(positionedCharacters);
        arrPosition.push(positionedCharacters);
      });
      enamy.forEach(function (character) {
        var enamyArrayPosition = createPosition(0, _this.gamePlay.boardSize - 1, _this.gamePlay.boardSize - 2, _this.gamePlay.boardSize - 1, _this.gamePlay.boardSize, arrPosition);
        var positionedCharacters = new _PositionedCharacter["default"](character, enamyArrayPosition);
        positionedCharacters.isPlayer = false;
        positionedCharacters.condition = 'live';
        _this.state.positionedCharacters.push(positionedCharacters);
        arrPosition.push(positionedCharacters);
      });
      this.gamePlay.redrawPositions(arrPosition);
      function createPosition(minString, maxString, minColumn, maxColumn, boardSize, usedPosition) {
        var position;
        var index = 0;
        while ((!position || usedPosition.some(function (elem) {
          return elem.position === position;
        })) && index < 1000) {
          var string = (0, _generators.getRandomNumb)(minString, maxString);
          var column = (0, _generators.getRandomNumb)(minColumn, maxColumn);
          position = string * boardSize + column;
          index += 1;
        }
        return position;
      }
    }
  }, {
    key: "registrationEvents",
    value: function registrationEvents() {
      this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
      this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
      this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
      this.gamePlay.addNewGameListener(this.onNewGame.bind(this));
      this.gamePlay.addSaveGameListener(this.onSaveGameListner.bind(this));
      this.gamePlay.addLoadGameListener(this.onLoadGameListner.bind(this));
    }
  }, {
    key: "onNewGame",
    value: function onNewGame() {
      this.state.fieldActivityBlock = false;
      this.activeCharacter = null;
      this.state = new _GameState["default"]();
      this.init();
    }
  }, {
    key: "onSaveGameListner",
    value: function onSaveGameListner() {
      this.stateService.save(this.state);
    }
  }, {
    key: "onLoadGameListner",
    value: function onLoadGameListner() {
      var newState = _GameState["default"].from(this.stateService.load());
      for (var key in newState) {
        this.state[key] = newState[key];
      }
      this.state.positionedCharacters = this.state.positionedCharacters.map(function (elem) {
        var character = new _character["default"][elem.character.type](elem.character.level);
        character.attack = elem.character.attack;
        character.defence = elem.character.defence;
        character.health = elem.character.health;
        var newPositionedCharacter = new _PositionedCharacter["default"](character, elem.position);
        newPositionedCharacter.isPlayer = elem.isPlayer;
        newPositionedCharacter.condition = elem.condition;
        return newPositionedCharacter;
      });
      this.activeCharacter = null;
      this.gamePlay.drawUi((0, _themes.getThemes)()[this.state.levelGame]);
      this.gamePlay.redrawPositions(this.state.positionedCharacters.filter(function (character) {
        return character.condition !== 'death';
      }));
    }
  }, {
    key: "onCellClick",
    value: function onCellClick(index) {
      var _this2 = this;
      if (this.fieldActivityBlock) {
        return;
      }
      var elem = this.gamePlay.cells[index];
      var character = elem.querySelector('.character');
      if (this.state.move % 2 === 0 && character && !this.activeCharacter) {
        this.state.positionedCharacters.forEach(function (element) {
          if (element.position === index && !element.isPlayer) {
            _GamePlay["default"].showError('Персонаж противника недоступен!');
          }
          if (element.position === index && element.isPlayer) {
            _this2.gamePlay.cells.forEach(function (cell, i) {
              if (cell.className.indexOf('selected-yellow') > -1) {
                _this2.gamePlay.deselectCell(i);
              } else {
                _this2.selectCharacter(element, index);
              }
            });
          }
        });
      } else if (this.state.move % 2 === 0 && character && this.activeCharacter) {
        this.state.positionedCharacters.forEach(function (elem) {
          if (elem.position === index && !elem.isPlayer && _this2.activeCharacter.calculationRadiusAttack(index, _this2.gamePlay.boardSize)) {
            var damage = _this2.activeCharacter.character.getDamage(elem.character);
            if (elem.character.health - damage > 0) {
              elem.character.health = elem.character.health - damage;
            } else {
              _this2.state.positionedCharacters = _this2.state.positionedCharacters.filter(function (character) {
                return character.position !== elem.position;
              });
            }
            _this2.gamePlay.showDamage(index, damage).then(function () {
              _this2.gamePlay.deselectCell(_this2.activeCharacter.position);
              _this2.removeSelect(index, _this2.state.positionedCharacters.filter(function (character) {
                return character.condition !== 'death';
              }));
            });
          } else if (elem.position === index && elem.isPlayer) {
            _this2.gamePlay.cells.forEach(function (cell, i) {
              if (cell.className.indexOf('selected-yellow') > -1) {
                _this2.gamePlay.deselectCell(i);
              } else {
                _this2.selectCharacter(elem, index);
              }
            });
          }
        });
      } else if (this.state.move % 2 === 0 && this.activeCharacter && this.activeCharacter.calculationRadiusMove(index, this.gamePlay.boardSize)) {
        this.state.positionedCharacters.forEach(function (elem) {
          if (elem.position === _this2.activeCharacter.position) {
            _this2.gamePlay.deselectCell(_this2.activeCharacter.position);
            elem.position = index;
          }
        });
        this.removeSelect(index, this.state.positionedCharacters.filter(function (character) {
          return character.condition !== 'death';
        }));
      }
      // TODO: react to click
    }
  }, {
    key: "onCellEnter",
    value: function onCellEnter(index) {
      var _this3 = this;
      if (this.fieldActivityBlock) {
        return;
      }
      var cell = this.gamePlay.cells[index];
      var character = cell.querySelector('.character');
      if (this.state.move % 2 === 0 && character) {
        this.state.positionedCharacters.forEach(function (element) {
          if (element.position === index) {
            _this3.gamePlay.showCellTooltip(GameController.massage(element), index);
            if (!element.isPlayer && _this3.activeCharacter) {
              if (_this3.activeCharacter.calculationRadiusAttack(index, _this3.gamePlay.boardSize) === true) {
                _this3.gamePlay.setCursor(_cursors["default"].crosshair);
                _this3.gamePlay.selectCell(index, 'red');
              } else {
                _this3.gamePlay.setCursor(_cursors["default"].notallowed);
              }
            } else if (!_this3.activeCharacter) {
              _this3.gamePlay.setCursor(_cursors["default"].auto);
              _this3.gamePlay.deselectCell(index);
            }
          }
        });
      } else if (this.state.move % 2 === 0 && this.activeCharacter) {
        if (this.activeCharacter.calculationRadiusMove(index, this.gamePlay.boardSize)) {
          this.gamePlay.selectCell(index, 'green');
        } else {
          this.gamePlay.setCursor(_cursors["default"].notallowed);
        }
      } else if (!this.activeCharacter) {
        this.gamePlay.setCursor(_cursors["default"].auto);
        this.gamePlay.deselectCell(index);
      }
      // TODO: react to mouse enter
    }
  }, {
    key: "onCellLeave",
    value: function onCellLeave(index) {
      if (this.fieldActivity) {
        return;
      }
      this.gamePlay.hideCellTooltip(index);
      this.gamePlay.setCursor(_cursors["default"].pointer);
      this.gamePlay.cells[index].classList.remove('selected-green');
      this.gamePlay.cells[index].classList.remove('selected-red');
      // TODO: react to mouse leave
    }
  }, {
    key: "selectCharacter",
    value: function selectCharacter(elem, index) {
      this.activeCharacter = elem;
      this.gamePlay.selectCell(index);
    }
  }, {
    key: "removeSelect",
    value: function removeSelect(index, arrCharacter) {
      this.gamePlay.redrawPositions(arrCharacter);
      this.onCellLeave(index);
      this.state.move += 1;
      this.activeCharacter = null;
      if (this.state.move % 2 != 0) {
        this.goEnamy();
      }
    }
  }, {
    key: "upLevel",
    value: function upLevel(numbOfCharacters) {
      this.state.levelGame += 1;
      this.activeCharacter = null;
      this.state.move = 0;
      this.gamePlay.drawUi((0, _themes.getThemes)()[this.state.levelGame]);
      var newCharacterPlayer = (0, _generators.generateTeam)([_character["default"].bowman, _character["default"].swordsman, _character["default"].magician], this.state.levelGame + 1, numbOfCharacters - this.state.positionedCharacters.length);
      var newCharacterEnamy = (0, _generators.generateTeam)([_character["default"].vampire, _character["default"].daemon, _character["default"].undead], this.state.levelGame + 1, numbOfCharacters);
      this.state.positionedCharacters.forEach(function (element) {
        if (element.condition === 'live') {
          element.character.level += 1;
          element.character.attack = Math.max(element.character.attack, element.character.attack * (80 + element.character.health) / 100);
          element.character.attack = Math.max(element.character.defence, element.character.defence * (80 + element.character.health) / 100);
          if (element.character.health + 80 > 100) {
            element.character.health = 100;
          } else {
            element.character.health += 80;
          }
        } else {
          element.character.health = 50;
        }
      });
      this.state.positionedCharacters.forEach(function (element) {
        newCharacterPlayer.push(element.character);
      });
      this.state.positionedCharacters = [];
      this.crateCharacter(newCharacterPlayer, newCharacterEnamy, []);
      this.gamePlay.redrawPositions(this.state.positionedCharacters);
    }
  }, {
    key: "goEnamy",
    value: function goEnamy() {
      var _this4 = this;
      var characterEnamy = [];
      var characterPlayer = [];
      var step = false;
      var skippPosition = [];
      var availablePosition = {};
      this.state.positionedCharacters.forEach(function (character) {
        skippPosition.push(character.position);
      });
      this.state.positionedCharacters.forEach(function (character) {
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
      characterEnamy.sort(function (a, b) {
        return a.character.level - b.character.level;
      });
      characterPlayer.sort(function (a, b) {
        return a.character.level - b.character.level;
      });
      characterEnamy.forEach(function (enamy, index) {
        availablePosition[index] = [];
        for (var i = 0; i < Math.pow(_this4.gamePlay.boardSize, 2); i += 1) {
          if (enamy.calculationRadiusMove(i, _this4.gamePlay.boardSize) && !skippPosition.includes(i) && i !== enamy.position) {
            availablePosition[index].push(i);
          }
        }
      });
      characterEnamy.forEach(function (heroEnamy) {
        characterPlayer.forEach(function (heroPlayer) {
          if (step) {
            return;
          }
          if (heroEnamy.calculationRadiusAttack(heroPlayer.position, _this4.gamePlay.boardSize)) {
            step = true;
            _this4.activeCharacter = heroEnamy;
            _this4.gamePlay.selectCell(_this4.activeCharacter.position);
            _this4.gamePlay.selectCell(heroPlayer.position, 'red');
            var damage = _this4.activeCharacter.character.getDamage(heroPlayer.character);
            if (heroPlayer.character.health - damage > 0) {
              heroPlayer.character.health = heroPlayer.character.health - damage;
            } else {
              _this4.state.positionedCharacters.forEach(function (character) {
                if (character.position === heroPlayer.position) {
                  character.condition = 'death';
                }
              });
              characterPlayer = characterPlayer.filter(function (characterPosition) {
                return characterPosition.position !== heroPlayer.position;
              });
            }
            _this4.gamePlay.showDamage(heroPlayer.position, damage).then(function () {
              _this4.gamePlay.deselectCell(_this4.activeCharacter.position);
              _this4.gamePlay.deselectCell(heroPlayer.position);
              _this4.removeSelect(_this4.activeCharacter.position, _this4.state.positionedCharacters.filter(function (character) {
                return character.condition !== 'death';
              }));
            });
            if (characterPlayer.length === 0) {
              _this4.state.defeat += 1;
              _this4.fieldActivity = true;
            }
          }
        });
      });
      if (step) {
        return;
      }
      characterEnamy.forEach(function (enamy, index) {
        availablePosition[index].forEach(function (newPosition) {
          characterPlayer.forEach(function (player) {
            if (step) {
              return;
            }
            var pastPosition = enamy.position;
            enamy.position = newPosition;
            if (enamy.calculationRadiusAttack(player.position, _this4.gamePlay.boardSize)) {
              step = true;
              _this4.gamePlay.selectCell(newPosition, 'green');
              enamy.position = pastPosition;
              _this4.activeCharacter = enamy;
              _this4.gamePlay.selectCell(_this4.activeCharacter.position);
              _this4.activeCharacter.position = newPosition;
              _this4.gamePlay.deselectCell(pastPosition);
              _this4.removeSelect(_this4.activeCharacter.position, _this4.state.positionedCharacters);
            } else {
              step = true;
              enamy.position = pastPosition;
              var randomIndexCharcter = (0, _generators.getRandomNumb)(0, characterEnamy.length - 1);
              var randomIndexPosition = (0, _generators.getRandomNumb)(0, availablePosition[randomIndexCharcter].length - 1);
              var randomPosition = availablePosition[randomIndexCharcter][randomIndexPosition];
              _this4.activeCharacter = characterEnamy[randomIndexCharcter];
              _this4.gamePlay.selectCell(_this4.activeCharacter.position);
              _this4.gamePlay.selectCell(randomPosition, 'green');
              _this4.state.positionedCharacters.forEach(function (elem) {
                if (elem.position === _this4.activeCharacter.position) {
                  _this4.gamePlay.deselectCell(_this4.activeCharacter.position);
                  elem.position = randomPosition;
                  _this4.gamePlay.deselectCell(randomPosition);
                }
              });
              _this4.removeSelect(randomPosition, _this4.state.positionedCharacters.filter(function (character) {
                return character.condition !== 'death';
              }));
            }
          });
        });
      });
      if (characterPlayer.length === 0) {
        this.state.defeat += 1;
        this.fieldActivityBlock = true;
      }
    }
  }], [{
    key: "massage",
    value: function massage(value) {
      return "\uD83C\uDF96 ".concat(value.character.level, " \u2694 ").concat(value.character.attack, " \uD83D\uDEE1 ").concat(value.character.defence, " \u2764 ").concat(value.character.health);
    }
  }]);
  return GameController;
}();