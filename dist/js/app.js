"use strict";

var _GamePlay = _interopRequireDefault(require("./GamePlay"));
var _GameController = _interopRequireDefault(require("./GameController"));
var _GameStateService = _interopRequireDefault(require("./GameStateService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Entry point of app: don't change this
 */

var gamePlay = new _GamePlay["default"]();
gamePlay.bindToDOM(document.querySelector('#game-container'));
var stateService = new _GameStateService["default"](localStorage);
var gameCtrl = new _GameController["default"](gamePlay, stateService);
gameCtrl.init();

// don't write your code here