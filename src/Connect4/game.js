import {CanvasBoard} from "./board.js"
import {Config} from "./config.js"
import $ from "jquery"

/**
 * Connect 4 game
 */
class Game {
    /**
     * Constructor for the game
     * @param {jsonObject} ids jsonobject for ids object
     * @param {number} depth the depth value for minimax
     */
    constructor(ids, depth) {
        this.ids = ids;
        this.depth = depth
        this.turn = Config.HUMAN_PLAYER;
        this.computerIsThinking = false;
        this.board = new CanvasBoard(null, this, ids);
    }

    /**
     * Place human move
     * @param {*} evt json object
     */
    placeHumanMove(evt) {
        let game = this

        let checkerSpace = evt.currentTarget.name
        let columnIndex = checkerSpace[checkerSpace.length - 1]

        let isValid = game.board.placeMove(game.turn, columnIndex)

        if (isValid) {
            game.switchTurn();
        }
    }

    /**
     * Place computer move that send json string to the minimax to the worker
     */
    generateComputerMove() {
        let game = this 
        let deferred = jQuery.Deferred();
        let depth = game.depth;

        let board = new CanvasBoard(game.board.maxtrix, game, this.ids)
        
        // add listener to the worker
        game.worker.addEventListener('message', function handler(e) {
            let bestmove = e.data;
            game.board.placeMove(game.turn, bestmove.columnMove);
            game.worker.removeEventListener('message', handler);
            deferred.resolve();
        }, false)

        let workerParams = {
            maxtrix : board.maxtrix,
            depth : depth,
            maximizingPlayer : false
        };

        // send the message to the listener
        game.worker.postMessage(JSON.stringify(workerParams))
        
        // return an promise
        return deferred.promise();
    }

    /**
     * reset the board and game
     */
    resetGame() {
        this.board.reset();
        this.turn = Config.HUMAN_PLAYER;
        $(`#${this.ids.winAlert}`).hide();
        $(`#${this.ids.canvasturn}`).empty()
        $(`#${this.ids.canvasturn}`).hide()
        $(`#${this.ids.boardGame}`).show()
        $(`#${this.ids.canvasTitle}`).show()
        $(`#${this.ids.logo}`).show()
        $(`#${this.ids.button}`).show()
        this.board.enableClick();
    }
    
    /**
     * Switch the turn between AI and the player
     */
    switchTurn() {
        let game = this

        //refresh the board
        game.board.refresh()

        game.turn = game.turn == Config.HUMAN_PLAYER ? Config.AI : Config.HUMAN_PLAYER;

        $(`#${this.ids.canvasturn}`).show()
        if(game.turn == Config.AI){
            //AI turn
            $(`#${this.ids.canvasturn}`).empty()
            game.computerIsThinking = true;
            game.board.disableClick();
            //show the thinking proces
            $(`#${this.ids.waitAlert}`).css('display', 'flex');
        }else if(game.turn == Config.HUMAN_PLAYER){
            //human turn
            $(`#${this.ids.canvasturn}`).empty()
            $(`#${this.ids.canvasturn}`).append("This is human turn")
            game.computerIsThinking = false;
            game.board.enableClick();
            $(`#${this.ids.waitAlert}`).hide();
        }

        //get the score
        let score = game.board.getScore();
        let isDrawn = game.board.isFull();

        if(isDrawn || score > Config.WINNING_SCORE - 100 || score < -Config.WINNING_SCORE + 100){
            $(`#${this.ids.winAlert}`).css('display', 'flex');
            $(`#${this.ids.waitAlert}`).hide();
            $(`#${this.ids.boardGame}`).hide();
            $(`#${this.ids.button}`).hide()
            $(`#${this.ids.canvasTitle}`).hide()
            $(`#${this.ids.logo}`).hide()
            
            $(`#${this.ids.canvasturn}`).hide();
            let winnertext = isDrawn ? "<p>Draw! Try again!</p>" : (score > 0 ? "<p>you win!</p>" : "<p>AI win!</p>");

            document.getElementById(this.ids.winAlert).innerHTML = winnertext;

            //add reset to the result page
            let resetbutton = $('<button id="restartGameAlert" type="button" class="btn btn-primary">Restart</button>')
            $(`#${this.ids.winAlert}`).append(resetbutton)

            $(resetbutton).on('click', function(e) {
                game.resetGame();
             });
            
            game.board.disableClick();
        }else{
            // if the turn is the AI, then do the promise. 
            // switch turn
            if(game.turn == Config.AI){
                game.generateComputerMove().done(function() {
                    game.switchTurn();
                });
            }
        }
    }
}
export{Game};