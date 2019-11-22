var token, tuid, channelName

// because who wants to type this every time?
var twitch = window.Twitch ? window.Twitch.ext : null

twitch.onContext(function(context) {
    //twitch.rig.log(context)
})

twitch.onAuthorized((auth) => {
    token = auth.token
    
    tuid = auth.userId
})

twitch.configuration.onChanged(() => {
    twitch.rig.log(token)
    if(twitch.configuration.broadcaster){
        let broadcaster = twitch.configuration.broadcaster
    
        let content = broadcaster ? broadcaster.content : []
    
        if (content === null) {
            // if the broadcaster is not empty, but do not have content, return []
            broadcaster.content = '[]'
            content = broadcaster.content
        }
        
        if(token ==! null || token ==! undefined){
            let value = JSON.parse(broadcaster.content)
            SwitchInit(value.mode)
        }
    }
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
    twitch.rig.log("token: " + token)
    let result = parseInt(value, 10)
    switch (result) {
        case 0:
            Init();
            break;
        case 1:
        case 2:
            //twitch.rig.log("token value: " + test)
            //AuthForMultiPlayer()
            break;
        default:
            twitch.rig.log("We don't know this value: " + value)
            break;
    }
}

function Init() {
    $('#CanvasBoard').empty();
    let button = $('<button id="restartGame" type="button" class="btn btn-primary">Restart</button>')
    let canvas = $('<canvas id="boardGame" width="300" height="300"></canvas>')
    $('#CanvasBoard').append(canvas)
    $('#CanvasBoard').append(button)

    $(button).on('click', function(e) {
       game.resetGame();
    });

    let game = new Game();
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
        SwitchInit(value.mode)
    })
})
