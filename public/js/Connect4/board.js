class CanvasBoard {
    constructor(maxtrix, game) {
        this.stage = (typeof (createjs != "undefined")) && new createjs.Stage(boardGame);
        this.currentgame = game;
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

    initBoard() {
        var board = this;
        board.stage.name = "stage";
        board.stage.enableMouseOver(20);
        var boardbackground = board.stage.addChild();
    }

    resetBoard() {

    }

    refresh() {

    }

    placeMove() {

    }

    enableClick() {

    }

    disableClick() {

    }

    isFull () {
        
    }
}


