// proper initialization
if('function' === typeof importScripts) {
   
	importScripts('config.js');
    importScripts('board.js');
    //importScripts('public/lib/easeljs/easeljs-NEXT.min.js');

	this.addEventListener('message', function(ev) {
		let params = JSON.parse(ev.data);
		let Board = new CanvasBoard(params.maxtrix);
		let newmove = new Minimax().alphabeta(Board, params.depth, {"score": -9999999}, {"score": 9999999}, params.maximizingPlayer);
		this.postMessage(newmove);
	}, false);

}

class Minimax{

    max(x, y){
        return x.score > y.score ? JSON.parse(JSON.stringify(x)) : JSON.parse(JSON.stringify(y))
    }
    
    min(x, y){
        return x.score < y.score ? JSON.parse(JSON.stringify(x)) : JSON.parse(JSON.stringify(y));
    }
    
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
