import $ from "jquery"
let token, channelId, clientId, darkOrLightMode;

var twitch = window.Twitch ? window.Twitch.ext : null

/**
 * Check if the theme is darkmode or lightmode
 * @param {*} theme The theme from context
 */
function IsDarkMode(theme) {
  return theme === "dark" ? true : false;
}

twitch.onContext((context) => {
  darkOrLightMode = context.theme

  twitch.rig.log(context)
  //if context is dark mode
  if(IsDarkMode(darkOrLightMode)){
    if($("#Title")[0]){
      $("#Title").prop('id', `TitleDark`)
    }

    if($("#Text")[0]){
      $("#Text").prop('id', `TextDark`)
    }

    if($("#resultText")[0]){
      $("#resultText").prop('id', `resultTextDark`)
    }
  }else{
    if($("#TitleDark")[0]){
      $("#TitleDark").prop('id', `Title`)
    }

    if($("#TextDark")[0]){
      $("#TextDark").prop('id', `Text`)
    }

    if($("#resultTextDark")[0]){
      $("#resultTextDark").prop('id', `resultText`)
    }
  }

});

twitch.configuration.onChanged(() => {
  let broadcaster = twitch.configuration.broadcaster

  if(!broadcaster){
    broadcaster = []
  }

  if(!broadcaster.content){
    broadcaster.content = '[]'
  }

  let value = JSON.parse(broadcaster.content)

  //set select element with the value 
  setElementValue("selectMode", value.mode)
})

/**
 * Set value
 * @param {*} id 
 * @param {*} valueToSelect 
 */
function setElementValue(id, valueToSelect) {    
  document.getElementById(id).value = valueToSelect;
}

/**
 * get value
 * @param {*} id 
 */
function getElementValue(id) {    
  return document.getElementById(id).value;
}

/**
 * Save the mode over pubsub extension message
 * @param {Value} selectedIndex 
 */
function saveMode (selectedIndex) {
  const jsonArray = {
    mode: selectedIndex
  }

  let json = JSON.stringify(jsonArray)

  // set configuration service with broadcaster and version number and json.
  twitch.configuration.set('broadcaster', '0.0.1', json)

  //twitch.rig.log('set broadcaster team: ' + json);

  // broadcast to the channel with the json data
  sendTeamBroadcast(channelId, json)
}

/**
 * Send value to pubsub extension messages
 * @param {*} channelId 
 * @param {*} array 
 */
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

/**
 * Broadcast the team to the channel by using the twitch api. We are using pubsub.
 * @param {*} method 
 * @param {*} channelId 
 * @param {*} headers 
 * @param {*} body 
 */
function BroadcastTemtemTeam (method, channelId, headers, body) {
  return {
    type: method,
    data: body,
    headers: headers,
    url: `https://api.twitch.tv/extensions/message/${channelId}`,
    success: function(data, staus, xhr) {
      //twitch.rig.log("successfully call")
    },
    error: function (xhr, status, err) {
      //twitch.rig.log("Error sending message to channel " + channelId + " : " + err);
      console.log('Raise an issue on our Github, if you can see this message.')
    }
  }
}

//We are authorized for pubsub
twitch.onAuthorized((auth) => {
  token = auth.token;
  channelId = auth.channelId;
  clientId = auth.clientId;
});

/**
 * Allow to change the mode
 * @param {Value} x 
 */
function ChangeMode(x){
  let result = IsDarkMode(darkOrLightMode) ? `#resultTextDark` : `#resultText`
  try {
    twitch.rig.log(result)
    $(result).empty()
    let value = parseInt(x, 10)
    switch (value) {
      case 0:
        saveMode(value);
        $(result).text("Successful select").css({ 'color': 'green', 'font-size': '150%' });
        break;
      default:
          $(result).text("unselected value").css({ 'color': 'red', 'font-size': '150%' });
        break;
    }
    
  } catch (error) {
    $(result).empty()
    $(result).text("Error in select").css({ 'color': 'red', 'font-size': '150%' });
    console.log(error)
  }
};

$(function() {
  $("#SubmitBtn").click(function() {
    let modevalue = getElementValue("selectMode")
    ChangeMode(modevalue)
  })
})
