
import ChatClient from 'twitch-chat-client';
let token = ""
let tuid = ""
let channelName = ""

// because who wants to type this every time?
var twitch = window.Twitch ? window.Twitch.ext : null

// create the request options for our Twitch API calls
twitch.onContext(function(context) {
    //twitch.rig.log(context)
})

twitch.configuration.onChanged(() => {
    let broadcasterObject = twitch.configuration.broadcaster
    let content = broadcasterObject ? broadcasterObject.content : []

    if (content === null) {
        // if the broadcaster is not empty, but do not have content, return []
        broadcasterObject.content = '[]'
        content = broadcasterObject.content
    }
    let value = JSON.parse(broadcasterObject.content)
    SwitchInit(value.mode, token)
})

twitch.onAuthorized(function(auth) {
    // save our credentials
    token = auth.token
    tuid = auth.userId
})

function AuthForMultiPlayer(token) {
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
            success: function (data) {
                channelName = data.name
                Init();
            }
        })
    }
    else {
        twitch.rig.log("No user id")
    }
}

function SwitchInit(value, token) {
    switch (value) {
        case 0:
            Init();
            break;
        case 1:
        case 2:
            AuthForMultiPlayer(token)
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

function updateMode(hex) {
    twitch.rig.log('Updating mode')
}

function logError(_, error, status) {
  twitch.rig.log('EBS request returned '+status+' ('+error+')')
}

function logSuccess(status) {
  // we could also use the output to update the block synchronously here,
  // but we want all views to get the same broadcast response at the same time.
  twitch.rig.log('EBS request returned '+' ('+status+')')
}

const chatClient = ChatClient.anonymous({ webSocket: true });
chatClient.onRegister(() => chatClient.join("djinnet"));
chatClient.onPrivmsg((channel, user, message, msg) => {

});
chatClient.connect();

$(function() {
    // listen for incoming broadcast message from our EBS
    twitch.listen('broadcast', function (target, contentType, message) {
        let value
        if(typeof (message) === 'string'){
            value = JSON.parse(message)
        }else{
            value = message
        }
        
        twitch.rig.log("listen from config : " + token)
        SwitchInit(value.mode, token)
    })
})
