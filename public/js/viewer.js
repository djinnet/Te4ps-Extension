var token = "", tuid ="", channelName =""
var theme = ""

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
    Init()
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
    let result = parseInt(value, 10)
    switch (result) {
        case 0:
            Init();
            break;
        default:
            twitch.rig.log("We don't know this value: " + value)
            Init();
            break;
    }
}

function getTheme(theme) {
    return theme ==! "light" ? "CanvasBoardDark" : "CanvasBoard";
}

function Init() {
    let CanvasBoard = getTheme(theme)
    twitch.rig.log(CanvasBoard)
    $("#app").append(`<div id='${CanvasBoard}'></div>`)
    
    $(`#${CanvasBoard}`).empty();

    let button = $('<button id="restartGame" type="button" class="btn btn-primary">Restart</button>')
    
    let canvas = $(`<canvas id="boardGame" width="300" height="300"></canvas>`)
    let canvasTitle = $('<h1 id="boardGameTitle">Connect 4</h1>')
    let canvasturn = $('<div id="turn"></div>')
    let canvasalert = $('<div id="Alert"></div>')
    
    let canvasLogo = $('<img id="boardGameLogo"/>')
    $(`#${CanvasBoard}`).append(canvasTitle)
    $(`#${CanvasBoard}`).append(canvasturn)
    $(`#${CanvasBoard}`).append(canvasalert)
    $(`#${CanvasBoard}`).append(canvas)
    $(`#${CanvasBoard}`).append(button)
    $(`#${CanvasBoard}`).append(canvasLogo)
    let outer = $('<div id="outer-box"></div>')
    outer.append('<div id="winningAlert"></div>')
    outer.append('<div id="waitingAlert" role="alert">AI is thinking...</div>')
    $("#Alert").append(outer)

    let game = new Game();
    $(button).on('click', function(e) {
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
    twitch.listen('broadcast', function (target, contentType, message) {
        this.twitch.rig.log(`New PubSub message!\n${target}\n${contentType}\n${message}`)
        let value = parseJson(message)
        
        //window.location.reload(false)
        Init()
    })
})
