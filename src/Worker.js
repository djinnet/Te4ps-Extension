//global config for worker
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
 * minimax class for worker
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

/**
 * Canvas board for worker
 */
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