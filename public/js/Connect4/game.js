class Game {
    constructor() {
        this.turn = Config.HUMAN_PLAYER
        this.computerIsThinking = false
        this.Board = new CanvasBoard(null, this, twitch)
    }

    placeHumanMove(evt) {
    }

    generateComputerMove() {
    }

    resetGame() {
    }
    
    switchTurn() {
    }
}




const twitch = window.Twitch ? window.Twitch.ext : null
function Init() {
    var game = new Game();
	game.worker = new Worker("js/Connect4/minimax.js");

    twitch.rig.log("is this working? " + game.Board.stage)
    game.Board.initBoard();
    //$("#restartGame").on('click', function(e) {
    //    game.resetGame();
    //});
}

window.onload = function() {
    Init()
};