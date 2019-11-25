let token = "", tuid ="", channelName =""
let theme = ""

var twitch = window.Twitch ? window.Twitch.ext : null

twitch.onContext((context) => {
    theme = context.theme
    twitch.rig.log(context)
})

twitch.onAuthorized((auth) => {
    token = auth.token
    tuid = auth.userId
})

twitch.configuration.onChanged(() => {
    //Init()
    /*if(twitch.configuration.broadcaster){
        let broadcaster = twitch.configuration.broadcaster
    
        let content = broadcaster ? broadcaster.content : []
    
        if (content === null) {
            // if the broadcaster is not empty, but do not have content, return []
            broadcaster.content = '[]'
            content = broadcaster.content
        }
        
        let value = JSON.parse(broadcaster.content)
        //SwitchInit(value.mode)
        
    }*/
})

function AuthForMultiPlayer() {
    let parts = token.split(".")
    let payload = JSON.parse(window.atob(parts[1]))
    
    if (payload.user_id) {
        $.ajax({
            url: 'https://api.twitch.tv/kraken/users/' + payload.user_id,
            method: "get",
            headers: {
                "Client-ID": "2wo1au2eakivi3mww1cmjts5eraj2p",
                "Accept": "application/vnd.twitchtv.v5+json"
            },
            success:(data) => {
                channelName = data.name
                Init();
            }
        })
    }
    else {
        twitch.rig.log("No user id")
    }
}

function SwitchInit(value) {
    switch (parseInt(value, 10)) {
        case 0:
            Init();
            break;
        default:
            twitch.rig.log("We don't know this value: " + value)
            Init();
            break;
    }
}


function getAppTheme(theme, id) {
    return theme === "dark" ? `${id}Dark` : `${id}`;
}

function IsDarkMode(theme) {
    return theme === "dark" ? true : false;
}

function Init() {
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
    twitch.rig.log(Ids.CanvasBoard)
    twitch.rig.log(Ids.app)
    twitch.rig.log(isDarkmode)
    twitch.rig.log(Ids.canvasTitle)

    if(isDarkmode){
        $("#app").prop('id', `${Ids.app}`)
        $(`#${Ids.app}`).append(`<div id='${Ids.CanvasBoard}'></div>`)
        $(`#${Ids.CanvasBoard}`).empty();
    }else{
        $(`#${Ids.app}`).append(`<div id='${Ids.CanvasBoard}'></div>`)
        $(`#${Ids.CanvasBoard}`).empty();       
    }
    
    $(`#${Ids.CanvasBoard}`).append(`<h1 id=""${Ids.canvasTitle}"">Connect 4</h1>`)
    $(`#${Ids.CanvasBoard}`).append(`<p id="${Ids.boardGameCountTurn}"></p>`)
    $(`#${Ids.CanvasBoard}`).append(`<div id="${Ids.canvasturn}"></div>`)
    $(`#${Ids.CanvasBoard}`).append(`<div id="${Ids.alert}"></div>`)
    $(`#${Ids.CanvasBoard}`).append(`<canvas id="${Ids.boardGame}" width="300" height="300"></canvas>`)
    $(`#${Ids.CanvasBoard}`).append(`<button id="${Ids.button}" type="button" class="btn btn-primary">Restart</button>`)
    $(`#${Ids.CanvasBoard}`).append(`<img id="${Ids.logo}"/>`)

    
    let outer = $(`<div id="outer-box"></div>`)
    outer.append(`<div id="${Ids.winAlert}"></div>`) 
    outer.append(`<div id="${Ids.waitAlert}" role="alert">&#9881;</div>`)
    $(`#${Ids.alert}`).append(outer)

    
    let game = new Game(Ids);
    $(`#${Ids.button}`).on('click', function(e) {
       game.resetGame();
    });

    game.worker = new Worker("js/Connect4/minimax.js");
    game.board.initBoard(game);

    
}

function parseJson(input){
    return typeof (input) === 'string' ? JSON.parse(input) : input
}

$(function() {
    // listen for incoming broadcast message from our EBS
    /*
    twitch.listen('broadcast', function (target, contentType, message) {
        this.twitch.rig.log(`New PubSub message!\n${target}\n${contentType}\n${message}`)
        let value = parseJson(message)
        
        //window.location.reload(false)
        Init()
    })
    */
   Init()
})
