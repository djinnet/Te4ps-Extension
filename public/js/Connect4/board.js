class CanvasBoard {
    constructor(maxtrix, game) {
        this.stage = (typeof (createjs != "undefined")) && new createjs.Stage(boardGame)
        this.currentgame = game
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
        var board = this
        board.stage.name = "stage"
        board.stage.enableMouseOver(20)


        var boardBackground = board.stage.addChild(new createjs.Shape()).set({ name: "background", x: 0, y: 0 })
        boardBackground.graphics.beginFill("#0277BD").beginStroke("black").drawRect(60, 10, 380, 330)
	    boardBackground.graphics.beginFill("#01579B").beginStroke("black").drawRect(30, 330, 440, 20)
    
    
        //Draw checkers
        board.checkerSpaceContainer = board.stage.addChild(new createjs.Container()).set({ name: "board" });
        _.forEach(board.matrixBoard, function (row, rowIndex) {
            _.forEach(row, function (column, columnIndex) {
                var checkerSpace = board.checkerSpaceContainer.addChild(new createjs.Shape()).set({ name: "cs-" + rowIndex + columnIndex, x: 100 + (50 * columnIndex), y: 50 + (50 * rowIndex) });
                checkerSpace.graphics.beginFill("#FFFF").beginStroke("grey").drawCircle(0, 0, 23);
                checkerSpace.cursor = "pointer";
                checkerSpace.addEventListener("click", (board.currentgame.placeHumanMove).bind(board.currentgame) );
            });
        });
    }

    resetBoard() {
        var board = this;
        _.forEach(board.matrixBoard, function (row, rowIndex) {
            _.forEach(row, function (column, columnIndex) {
                var checkerSpace = board.checkerSpaceContainer.getChildByName("cs-" + rowIndex + columnIndex);
                checkerSpace.graphics.beginFill("#FFFF").beginStroke("grey").drawCircle(0, 0, 23);
                board.matrixBoard[rowIndex][columnIndex] = 0 ;
            });
        });
    }

    refresh() {
        var board = this;
        _.forEach(board.matrixBoard, function (row, rowIndex) {
            _.forEach(row, function (column, columnIndex) {
                var checkerSpace = board.checkerSpaceContainer.getChildByName("cs-" + rowIndex + columnIndex);
                if(board.matrixBoard[rowIndex][columnIndex] == Config.HUMAN_PLAYER){
                    checkerSpace.graphics.beginFill("#f70202").beginStroke("grey").drawCircle(0, 0, 23);
                }else if(board.matrixBoard[rowIndex][columnIndex] == Config.COMPUTER_AI){
                    checkerSpace.graphics.beginFill("#ffc107").beginStroke("grey").drawCircle(0, 0, 23);
                }	
            });
        });
    }

    placeMove() {
        var board = newBoard ? new CanvasBoard(this.matrixBoard) : this;
        for(var i = Config.ROWS_SIZE-1; i >= 0 ; i--){
            if(board.matrixBoard[i][columnMove] == 0){
                board.matrixBoard[i][columnMove] = player;
                return board;
            }
        }
        return false;
    }

    enableClick() {
        this.isClickDisabled = false;
    }

    disableClick() {
        this.isClickDisabled = true;
    }

    isFull () {
        var board = this;
        for(var column=0; column<Config.COLUMNS_SIZE; column++){
            var atLeastOneEmpty = false;
            if(board.matrixBoard[0][column] == 0){
                atLeastOneEmpty = true;
                break;
            }
        };
        return !atLeastOneEmpty;
    }
}


