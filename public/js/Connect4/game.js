class Game {
    constructor() {
        this.turn = 0;
        this.computerIsThinking = false;
        this.Board = new CanvasBoard(null, this);
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





function Init() {
    var game = new Game();

	game.worker = new Worker('AI/minimax.js');

    game.Board.initBoard();
    $("#restartGame").on('click', function(e) {
        game.resetGame();
    });
}

window.onload = function() {
    Init()
};