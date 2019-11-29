import {Game} from "./Connect4/game.js"
import $ from "jquery"

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//this javascript document values
let token = "", tuid ="", channelName ="", theme = "", mode = 0

/**
 * global value for twitch
 */
var twitch = window.Twitch ? window.Twitch.ext : null

/**
 * Get context values from twitch
 */
twitch.onContext((context) => {
    theme = context.theme
    twitch.rig.log(context)
    SwitchInit(mode)
})

/**
 * get authorized values from twitch 
 * and assign them to the values
 */
twitch.onAuthorized((auth) => {
    token = auth.token
    tuid = auth.userId
})

/**
 * Changed if configuration has changed as event
 */
twitch.configuration.onChanged(() => {
    let broadcaster = twitch.configuration.broadcaster

  if(!broadcaster){
    broadcaster = []
  }

  if(!broadcaster.content){
    broadcaster.content = '[]'
  }

  let value = JSON.parse(broadcaster.content)
  mode = value.mode
})

/**
 * Switch init
 * @param {number} value the number for call the game
 */
function SwitchInit(value) {
    switch (parseInt(value, 10)) {
        case 0:
            Init();
            break;
        default:
            twitch.rig.log("We don't know this value: " + value)
            break;
    }
}

/**
 * add dark tag to the id
 * @param {*} theme The theme from context
 * @param {*} id id name
 */
function getAppTheme(theme, id) {
    return theme === "dark" ? `${id}Dark` : `${id}`;
}

/**
 * Check if the theme is darkmode or lightmode
 * @param {*} theme The theme from context
 */
function IsDarkMode(theme) {
    return theme === "dark" ? true : false;
}

function GetLogo(theme) {
    return theme === "dark" ? "../img/DarkmodeDuck.png" : "../img/DuckLogo.png";
}

/**
 * Call to start the connect 4 game
 */
function Init() {
    //check if theme is darkmode or lightmode
    let appId = getAppTheme(theme, "app")
    let CanvasBoardId = getAppTheme(theme, "CanvasBoard")
    let boardGameId = getAppTheme(theme, "boardGame")
    let buttonId = getAppTheme(theme, "restartGame")
    let boardGameCountTurnId = getAppTheme(theme, "boardGameCountTurn")
    let canvasTitleId = getAppTheme(theme, "boardGameTitle")
    let canvasturnId = getAppTheme(theme, "turn")
    let alertId = getAppTheme(theme, "Alert")
    let logoId = getAppTheme(theme, "boardGameLogo")
    let winAlertId = getAppTheme(theme, "winningAlert")
    let waitAlertId = getAppTheme(theme, "waitingAlert")

    //assign all ids in an json object
    let Ids = {
        theme:theme,
        app:appId,
        CanvasBoard:CanvasBoardId,
        boardGame:boardGameId,
        button:buttonId,
        boardGameCountTurn:boardGameCountTurnId,
        canvasTitle:canvasTitleId,
        canvasturn:canvasturnId,
        alert:alertId,
        logo:logoId,
        winAlert:winAlertId,
        waitAlert:waitAlertId
    }

    let isDarkmode = IsDarkMode(theme)

    //if theme is darkmode
    if(isDarkmode){
        //if body is light in darkmode
        if($("#bodyExtension")[0]){
            $("#bodyExtension").prop('id', `bodyExtensionDark`)
        }

        //if app is light in darkmode
        if($("#app")[0]){
            $(`#app`).empty();
            //change app light mode to darkmode
            $("#app").prop('id', `${Ids.app}`)
            $(`#${Ids.app}`).append(`<div id='${Ids.CanvasBoard}'></div>`)
        }else{
            //if app darkmode exists
            $(`#${Ids.app}`).empty();
            $(`#${Ids.app}`).append(`<div id='${Ids.CanvasBoard}'></div>`)
        }
        
    }else{
        //if body is dark in lightmode
        if($("#bodyExtensionDark")[0]){
            $("#bodyExtensionDark").prop('id', `bodyExtension`)
        }

        //if app dark mode exists
        if($("#appDark")[0]){
            $(`#appDark`).empty();
            //change app Dark mode to lightmode
            $("#appDark").prop('id', `${Ids.app}`)
            $(`#${Ids.app}`).append(`<div id='${Ids.CanvasBoard}'></div>`)
        }else{
            //if app lightmode exists
            $(`#${Ids.app}`).empty();
            $(`#${Ids.app}`).append(`<div id='${Ids.CanvasBoard}'></div>`)
        }
    }

    let logo = GetLogo(theme)

    //add html tags to canvas board
    $(`#${Ids.CanvasBoard}`).append(`<h1 id="${Ids.canvasTitle}">Connect 4</h1>`)
    $(`#${Ids.CanvasBoard}`).append(`<p id="${Ids.boardGameCountTurn}"></p>`)
    $(`#${Ids.CanvasBoard}`).append(`<div id="${Ids.canvasturn}"></div>`)
    $(`#${Ids.CanvasBoard}`).append(`<div id="${Ids.alert}"></div>`)
    $(`#${Ids.CanvasBoard}`).append(`<canvas id="${Ids.boardGame}" width="300" height="300"></canvas>`)
    $(`#${Ids.CanvasBoard}`).append(`<button id="${Ids.button}" type="button" class="btn btn-primary">Restart</button>`)
    $(`#${Ids.CanvasBoard}`).append(`<img id="${Ids.logo}" src="${logo}" />`)

    //add html tags to alert    
    let outer = $(`<div id="outer-box"></div>`)
    outer.append(`<div id="${Ids.winAlert}"></div>`) 
    outer.append(`<div id="${Ids.waitAlert}" role="alert">&#9881;</div>`)
    $(`#${Ids.alert}`).append(outer)

    //Game logic
    let game = new Game(Ids, 5, twitch);

    //reset btn logic
    $(`#${Ids.button}`).on('click', function(e) {
       game.resetGame();
    });

    //game web worker
    game.worker = new Worker("./js/worker.js");

    //init the board
    game.board.initBoard(game);
}

/**
 * Parse json string into json object based on its input type
 * @param {text} input the input that can be an json string
 */
function parseJsonString(input){
    return typeof (input) === 'string' ? JSON.parse(input) : input
}

$(function() {
    // listen for incoming broadcast message from our EBS
    twitch.listen('broadcast', function (target, contentType, message) {
        twitch.rig.log(`New PubSub message!\n${target}\n${contentType}\n${message}`)
        let value = parseJsonString(message)
        mode = value.mode
    })
})