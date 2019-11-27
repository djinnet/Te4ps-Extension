"use strict";
export {Minimax};
import {Config} from "./config.js";

/**
 * minimax class
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