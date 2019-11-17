class Game {
    constructor() {
        this.turn = Config.HUMAN_PLAYER;
        this.computerIsThinking = false;
        this.board = new CanvasBoard(null, this, twitch);
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
        this.board.enableClick();
    }
    
    switchTurn() {
        let game = this

        game.board.refresh()

        game.turn = game.turn == Config.HUMAN_PLAYER ? Config.AI : Config.HUMAN_PLAYER;

        if(game.turn == Config.AI){
            game.computerIsThinking = true;
            game.board.disableClick();
            //show the thinking proces
            $("#waitingAlert").show();
        }else if(game.turn == Config.HUMAN_PLAYER){
            //human turn
            game.computerIsThinking = false;
            game.board.enableClick();
            $("#waitingAlert").hide();
        }

        let score = game.board.getScore();
        twitch.rig.log("switchTurn score: " + score);
        let isDrawn = game.board.isFull();

        if(isDrawn || score > Config.WINNING_SCORE - 100 || score < -Config.WINNING_SCORE + 100){
            $("#winningAlert").show();
            $("#waitingAlert").hide();

            let winnertext = isDrawn ? "Draw! Try again!" : (score > 0 ? "you win!" : "AI win!");

            document.getElementById("winningAlert").innerHTML = winnertext;

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

function Init() {
    let game = new Game();
    game.worker = new Worker("js/Connect4/minimax.js");
    
    //twitch.rig.log(game);
    game.board.initBoard(game);

    //$("#restartGame").on('click', function(e) {
    //    game.resetGame();
    //});
}

window.onload = function() {
    Init();
};