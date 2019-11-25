class Game {
    constructor(ids) {
        this.ids = ids;
        this.turn = Config.HUMAN_PLAYER;
        this.computerIsThinking = false;
        this.board = new CanvasBoard(null, this, ids);
    }

    placeHumanMove(evt) {
        let game = this

        let checkerSpace = evt.currentTarget.name
        let columnIndex = checkerSpace[checkerSpace.length - 1]

        let isValid = game.board.placeMove(game.turn, columnIndex)

        if (isValid) {
            game.switchTurn();
        }
    }

    generateComputerMove() {
        let game = this
        let deferred = jQuery.Deferred();
        let depth = 5;

        let board = new CanvasBoard(game.board.maxtrix, game, this.ids)
        
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

        game.worker.postMessage(JSON.stringify(workerParams))
        return deferred.promise();
    }

    resetGame() {
        this.board.reset();
        this.turn = Config.HUMAN_PLAYER;
        $(`#${this.ids.alert}`).hide();
        $(`#${this.ids.canvasturn}`).empty()
        $(`#${this.ids.canvasturn}`).hide()
        $(`#${this.ids.boardGame}`).show()
        $(`#${this.ids.canvasTitle}`).show()
        $(`#${this.ids.logo}`).show()
        $(`#${this.ids.buttonId}`).show()
        this.board.enableClick();
    }
    
    switchTurn() {
        let game = this

        game.board.refresh()

        game.turn = game.turn == Config.HUMAN_PLAYER ? Config.AI : Config.HUMAN_PLAYER;

        $(`#${this.ids.canvasturn}`).show()
        if(game.turn == Config.AI){
            twitch.rig.log("This is AI turn");
            $(`#${this.ids.canvasturn}`).empty()
            game.computerIsThinking = true;
            game.board.disableClick();
            //show the thinking proces
            $(`#${this.ids.waitAlert}`).css('display', 'flex');
        }else if(game.turn == Config.HUMAN_PLAYER){
            //human turn
            twitch.rig.log("This is human turn");
            $(`#${this.ids.canvasturn}`).empty()
            $(`#${this.ids.canvasturn}`).append("This is human turn")
            game.computerIsThinking = false;
            game.board.enableClick();
            $(`#${this.ids.waitAlert}`).hide();
        }

        let score = game.board.getScore();
        twitch.rig.log("switchTurn score: " + score);
        let isDrawn = game.board.isFull();

        if(isDrawn || score > Config.WINNING_SCORE - 100 || score < -Config.WINNING_SCORE + 100){
            $(`#${this.ids.winAlert}`).css('display', 'flex');
            $(`#${this.ids.waitAlert}`).hide();
            $(`#${this.ids.boardGame}`).hide();
            $(`#${this.ids.buttonId}`).hide()
            $(`#${this.ids.canvasTitle}`).hide()
            $(`#${this.ids.logo}`).hide()
            
            $(`#${this.ids.canvasturn}`).hide();
            let winnertext = isDrawn ? "<p>Draw! Try again!</p>" : (score > 0 ? "<p>you win!</p>" : "<p>AI win!</p>");

            document.getElementById(this.ids.winAlert).innerHTML = winnertext;

            let resetbutton = $('<button id="restartGameAlert" type="button" class="btn btn-primary">Restart</button>')
            $(`#${this.ids.winAlert}`).append(resetbutton)

            $(resetbutton).on('click', function(e) {
                game.resetGame();
             });
            
            game.board.disableClick();
        }else{
            if(game.turn == Config.AI){
                game.generateComputerMove().done(function() {
                    game.switchTurn();
                });
            }
        }
    }
}

