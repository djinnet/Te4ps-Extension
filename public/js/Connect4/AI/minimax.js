// proper initialization
if( 'function' === typeof importScripts) {
   
	importScripts('config.js');
	importScripts('board.js');

	this.addEventListener('message', function(ev) {
		var params = JSON.parse(ev.data);
		var Board = new CanvasBoard(params.matrixBoard);
		var newmove = Minimax.alphabeta(Board, params.depth, {"score": -9999999}, {"score": 9999999}, params.maximizingPlayer);
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
    
    }
}
