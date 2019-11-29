/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 9:
/***/ (function(module, exports) {

var Config = {
    HUMAN_PLAYER: 1,
    AI: 2,
    ROWS_SIZE: 6,
    COLUMNS_SIZE: 7,
    WINNING_SCORE: 1000000
}

// proper initialization
if('function' === typeof importScripts){
    if(typeof window != "object"){
        self.window = self
    
        // add this js an event listener
        self.addEventListener('message', function(ev) {
            let params = JSON.parse(ev.data);
            let Board = new CanvasBoard(params.maxtrix);
            let newmove = new Minimax().alphabeta(Board, params.depth, {"score": -9999999}, {"score": 9999999}, params.maximizingPlayer);
            self.postMessage(newmove);
        }, false);
    }
    
}


/**
 * minimax class
 */
class Minimax{

    /**
     * Calculate max value
     * @param {number} x 
     * @param {number} y 
     */
    max(x, y){
        return x.score > y.score ? JSON.parse(JSON.stringify(x)) : JSON.parse(JSON.stringify(y))
    }
    
    /**
     * Calculate min value
     * @param {*} x 
     * @param {*} y 
     */
    min(x, y){
        return x.score < y.score ? JSON.parse(JSON.stringify(x)) : JSON.parse(JSON.stringify(y));
    }
    
    /**
     * Calculate minimax and alpha-beta pruning
     * @param {*} board 
     * @param {*} depth 
     * @param {*} a 
     * @param {*} b 
     * @param {*} maximizingPlayer 
     */
    alphabeta(board, depth, a, b, maximizingPlayer) {
        let currentScore = board.getScore();
        let nodes = [];

        let player = maximizingPlayer ? Config.HUMAN_PLAYER : Config.AI

        for(let column = 0; column < Config.COLUMNS_SIZE; column++){
            let nextPossibleBoard = board.placeMove(player, column, true);
            if(nextPossibleBoard) nodes[column] = nextPossibleBoard
        }

        let isDrawn = nodes.length == 0;
        
        if(depth == 0 || isDrawn || currentScore <= -Config.WINNING_SCORE || currentScore >= Config.WINNING_SCORE){
            let leaf = {
                "columnMove" : null, 
                "score" : currentScore
            }
            return leaf
        }

        if(maximizingPlayer){
            let v = {
                "columnMove" : null,
                "score" : -99999
            }

            for(let i = 0; i <= nodes.length; i++){
                if(!nodes[i]) continue;
                let nextmove = this.alphabeta(nodes[i], depth - 1, a, b, false)
                if(nextmove.score > v.score || v.columnMove == null){
                    v.columnMove = i;
                    v.score = nextmove.score;
                }
                a = this.max(a, nextmove)
                if(b.score <= a.score){
                    break;
                }
            }
            return v;
        }else{
            let v = {
                "columnMove" : null,
                "score" : 99999
            }
            
            for( let i = 0; i <= nodes.length; i++){
                if(!nodes[i]) continue;
                let nextmove = this.alphabeta(nodes[i], depth - 1, a, b, true)
                if(nextmove.score < v.score || v.columnMove == null){
                    v.columnMove = i;
                    v.score = nextmove.score;
                }
                b = this.min(b, nextmove)
                if(b.score <= a.score){
                    break;
                }
            }
            return v;
        }
    }
}

class CanvasBoard {
    constructor(maxtrix) {
        this.maxtrix = JSON.parse(JSON.stringify(maxtrix)) ||
            [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];
    }

    


    /**
     * Place move on the board
     * @param {*} player 
     * @param {*} columnMove 
     * @param {*} newBoard 
     */
    placeMove(player, columnMove, newBoard) {
        let board = newBoard ? new CanvasBoard(this.maxtrix) : this;
        for(let i = Config.ROWS_SIZE-1; i >= 0 ; i--){
            if(board.maxtrix[i][columnMove] == 0){
                board.maxtrix[i][columnMove] = player;
                return board;
            }
        }
        return false;
    }

    /**
     * Updated the score
     * @param {*} humanInRow 
     * @param {*} ComputerInRow 
     */
    updateScore(humanInRow, ComputerInRow){
        let points = 0;
        switch (humanInRow) {
            case 4:
                points += Config.WINNING_SCORE;
                break;
        
            case 3:
                points += 5;
                break;
            
            case 2:
                points += 1;
                break;

            default:
                break;
        }

        switch (ComputerInRow) {
            case 4:
                points -= Config.WINNING_SCORE;
                break;
        
            case 3:
                points -= 5;
                break;
            
            case 2:
                points -= 1;
                break;

            default:
                break;
        }

        return points;
    }

    /**
     * calculate the score and get result
     */
    getScore(){
        let board = this;
        let score = 0;
        //console.log(JSON.stringify(board.maxtrix))
        //twitch.rig.log(JSON.stringify(board.maxtrix))
        //todo: check this out: https://gist.github.com/Sascha-Gschwind/7cd6decff03a6e41a795d6f6104cb8af
        //refactored this into single loop
        //check rows
        for(let row = 0; row < Config.ROWS_SIZE; row++){
            for (let column = 0; column <= Config.COLUMNS_SIZE - 4; column++) {
                var humanInRow = 0;
                var ComputerInRow = 0;

                for (let offset = column; offset < column + 4; offset++) {
                    if(board.maxtrix[row][offset] == 1){
                        humanInRow++;
                        ComputerInRow = 0;
                    }else if(board.maxtrix[row][offset] == 2){
                        ComputerInRow++;
                        humanInRow = 0;
                    }
                }
                score += this.updateScore(humanInRow, ComputerInRow);

                if(score <= -Config.WINNING_SCORE || score >= Config.WINNING_SCORE){
                    return score;
                }
            }
        }

        //check columns
        for(let column = 0; column < Config.COLUMNS_SIZE; column++){
            for (let row = 0; row <= Config.ROWS_SIZE - 4; row++) {
                var humanInRow = 0;
                var ComputerInRow = 0;
                
                for (let offset = row; offset < row + 4; offset++) {
                    if(board.maxtrix[offset][column] == 1){
                        humanInRow++;
                        ComputerInRow = 0;
                    }else if(board.maxtrix[offset][column] == 2){
                        ComputerInRow++;
                        humanInRow = 0;
                    }
                }
                
                score += this.updateScore(humanInRow, ComputerInRow);

                if(score <= -Config.WINNING_SCORE || score >= Config.WINNING_SCORE){
                    return score;
                }
            }
        }

        //check diagonals
        //one direction in diagonal
        for (let column=0; column <= Config.COLUMNS_SIZE - 4; column++){
            for (let row = 0; row <= Config.ROWS_SIZE - 4; row++) {
                var humanInRow = 0;
                var ComputerInRow = 0;
                
                for (let offset = row; offset < row + 4; offset++) {
                    if(board.maxtrix[offset][(offset - row) + column] == 1){
                        humanInRow++;
                        ComputerInRow = 0;
                    }else if(board.maxtrix[offset][(offset - row) + column] == 2){
                        ComputerInRow++;
                        humanInRow = 0;
                    }
                }
                score += this.updateScore(humanInRow, ComputerInRow);

                if(score <= -Config.WINNING_SCORE || score >= Config.WINNING_SCORE){
                    return score;
                }
            }
        }

        //another direction in diagonal
        for (let column = Config.COLUMNS_SIZE - 1; column >= Config.COLUMNS_SIZE - 4; column--){
            for (let row = 0; row <= Config.ROWS_SIZE - 4; row++) {
                var humanInRow = 0;
                var ComputerInRow = 0;
                
                for (let offset = row; offset < row + 4; offset++) {
                    if(board.maxtrix[offset][column - (offset - row)] == 1){
                        humanInRow++;
                        ComputerInRow = 0;
                    }else if(board.maxtrix[offset][column - (offset - row)] == 2){
                        ComputerInRow++;
                        humanInRow = 0;
                    }
                }

                score += this.updateScore(humanInRow, ComputerInRow);

                if(score <= -Config.WINNING_SCORE || score >= Config.WINNING_SCORE){
                    return score;
                }
            }
        }

        return score;
    }
}

/***/ })

/******/ });