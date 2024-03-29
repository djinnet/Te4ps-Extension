class CanvasBoard {
    constructor(maxtrix, game) {
        this.currentgame = game;
        this.stage = (typeof createjs != "undefined") && new createjs.Stage("boardGame");
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

    initBoard(currentgame) {
        let board = this;
        board.stage.name = "stage";
        board.stage.mouseEventsEnabled = true;
        board.stage.enableMouseOver();

        if(!currentgame){
            twitch.rig.log("game is null");
        }
        this.currentgame = currentgame;
        //twitch.rig.log(JSON.stringify(currentgame));

        let boardBackground = board.stage.addChild(new createjs.Shape()).set({ name: "background", x: 0, y: 0 })
        boardBackground.graphics.beginFill("#0277BD").beginStroke("black").drawRect(0, 20, 245, 240);
        boardBackground.graphics.beginFill("#01579B").beginStroke("black").drawRect(0, 250, 245, 10);
    
    
        //Draw checkers
        board.checkerSpaceContainer = board.stage.addChild(new createjs.Container()).set({ name: "board" })

        board.maxtrix.forEach(function (row, rowIndex) {
            row.forEach(function (column, columnIndex) {
                let checkerSpace = board.checkerSpaceContainer.addChild(new createjs.Shape()).set({ name: "cs-" + rowIndex + columnIndex, x: 20 + (34 * columnIndex), y: 50 + (35 * rowIndex) })
                checkerSpace.graphics.beginFill("#FFFF").beginStroke("grey").drawCircle(0, 0, 13)
                checkerSpace.cursor = "pointer"

                //test purposes
                /*checkerSpace.addEventListener("click", function(){
                    twitch.rig.log("banana");
                })*/

                checkerSpace.addEventListener("click", (currentgame.placeHumanMove).bind(currentgame) )
            })
        })

        board.stage.on('click', function(e) {
            if(board.isClickDisabled){
                e.stopPropagation();
            };
        }, null, false, {}, true);

        createjs.Ticker.addEventListener("tick", board.stage)
        board.stage.update();
    }

    reset() {
        let board = this;
        board.maxtrix.forEach(function (row, rowIndex) {
            row.forEach(function (column, columnIndex) {
                let checkerSpace = board.checkerSpaceContainer.getChildByName("cs-" + rowIndex + columnIndex);
                checkerSpace.graphics.beginFill("#FFFF").beginStroke("grey").drawCircle(0, 0, 13);
                board.maxtrix[rowIndex][columnIndex] = 0;
            });
        });
    }

    refresh() {
        let board = this;
        board.maxtrix.forEach(function (row, rowIndex) {
            row.forEach(function (column, columnIndex) {
                let checkerSpace = board.checkerSpaceContainer.getChildByName("cs-" + rowIndex + columnIndex);
                if(board.maxtrix[rowIndex][columnIndex] == Config.HUMAN_PLAYER){
                    checkerSpace.graphics.beginFill("#f70202").beginStroke("grey").drawCircle(0, 0, 13);
                }else if(board.maxtrix[rowIndex][columnIndex] == Config.AI){
                    checkerSpace.graphics.beginFill("#ffc107").beginStroke("grey").drawCircle(0, 0, 13);
                }	
            });
        });
    }

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

    enableClick() {
        this.isClickDisabled = false;
    }

    disableClick() {
        this.isClickDisabled = true;
    }

    isFull () {
        let board = this;
        for(let column=0; column<Config.COLUMNS_SIZE; column++){
            var atLeastOneEmpty = false;
            if(board.maxtrix[0][column] == 0){
                atLeastOneEmpty = true;
                break;
            }
        };
        return !atLeastOneEmpty;
    }

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


