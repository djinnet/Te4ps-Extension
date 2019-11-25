class Game {
    constructor(ids) {
        this.ids = ids;
        this.turn = Config.HUMAN_PLAYER;
        this.computerIsThinking = false;
        this.board = new CanvasBoard(null, this, theme);
    }

    placeHumanMove(evt) {
        let game = this
        //twitch.rig.log(evt.currentTarget.name)
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

        let board = new CanvasBoard(game.board.maxtrix, game, twitch)
        
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
        $("#winningAlert").hide();
        $("#turn").empty()
        $("#turn").hide()
        $("#boardGame").show()
        $("#boardGameTitle").show()
        $("#boardGameLogo").show()
        $("#restartGame").show()
        this.board.enableClick();
    }
    
    switchTurn() {
        let game = this

        game.board.refresh()

        game.turn = game.turn == Config.HUMAN_PLAYER ? Config.AI : Config.HUMAN_PLAYER;

        $("#turn").show()
        if(game.turn == Config.AI){
            twitch.rig.log("This is AI turn");
            $("#turn").empty()
            game.computerIsThinking = true;
            game.board.disableClick();
            //show the thinking proces
            $("#waitingAlert").css('display', 'flex');
        }else if(game.turn == Config.HUMAN_PLAYER){
            //human turn
            twitch.rig.log("This is human turn");
            $("#turn").empty()
            $("#turn").append("This is human turn")
            game.computerIsThinking = false;
            game.board.enableClick();
            $("#waitingAlert").hide();
        }

        let score = game.board.getScore();
        twitch.rig.log("switchTurn score: " + score);
        let isDrawn = game.board.isFull();

        if(isDrawn || score > Config.WINNING_SCORE - 100 || score < -Config.WINNING_SCORE + 100){
            $("#winningAlert").css('display', 'flex');
            $("#waitingAlert").hide();
            $("#boardGame").hide();
            $("#restartGame").hide()
            $("#boardGameTitle").hide()
            $("#boardGameLogo").hide()
            
            $("#turn").hide();
            let winnertext = isDrawn ? "<p>Draw! Try again!</p>" : (score > 0 ? "<p>you win!</p>" : "<p>AI win!</p>");

            document.getElementById("winningAlert").innerHTML = winnertext;

            let resetbutton = $('<button id="restartGameAlert" type="button" class="btn btn-primary">Restart</button>')
            $("#winningAlert").append(resetbutton)

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

