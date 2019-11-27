/*let token, userId, channelId, clientId;

var twitch = window.Twitch ? window.Twitch.ext : null

twitch.onContext((context) => {
});

twitch.configuration.onChanged(() => {
  /*
  let broadcaster = twitch.configuration.broadcaster

  if(!broadcaster){
    broadcaster = []
  }

  if(!broadcaster.content){
    broadcaster.content = '[]'
  }

  let value = JSON.parse(broadcaster.content)
  setElementValue("selectMode", value.mode)

})

function saveMode (selectedIndex) {
  const jsonArray = {
    mode: selectedIndex
  }

  let json = JSON.stringify(jsonArray)

  // set configuration service with broadcaster and version number and json.
  twitch.configuration.set('broadcaster', '0.0.1', json)

  twitch.rig.log('set broadcaster team: ' + json);

  // broadcast to the channel with the json data
  sendTeamBroadcast(channelId, json)
}

function sendTeamBroadcast (channelId, array) {
  // Set the HTTP headers required by the Twitch API.
  const headers = {
    'Client-ID': clientId,
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token
  }

  // Create the POST body for the Twitch API request.
  const body = JSON.stringify({
    content_type: 'application/json',
    message: array,
    targets: ['broadcast']
  })

  // Send the broadcast request to the Twitch API.
  // twitch.rig.log('Broadcasting temtem team ' + token + 'for ' + clientId ); //Debug purposes
  $.ajax(BroadcastTemtemTeam('POST', channelId, headers, body))
}

// Broadcast the team to the channel by using the twitch api. We are using pubsub.
function BroadcastTemtemTeam (method, channelId, headers, body) {
  return {
    type: method,
    data: body,
    headers: headers,
    url: `https://api.twitch.tv/extensions/message/${channelId}`,
    success: function(data, staus, xhr) {
      twitch.rig.log("successfully call")
    },
    error: function (xhr, status, err) {
      twitch.rig.log("Error sending message to channel " + channelId + " : " + err);
      console.log('Raise an issue on our Github, if you can see this message.')
    }
  }
}

function setElementValue(id, valueToSelect) {    
  document.getElementById(id).value = valueToSelect;
}

twitch.onAuthorized((auth) => {
  token = auth.token;
  channelId = auth.channelId
  clientId = auth.clientId
  userId = auth.userId;
});

function ChangeElementValue(x){
  //saveMode(x.selectedIndex);
};
*/