var token = ""
var tuid = ""

// because who wants to type this every time?
var twitch = window.Twitch ? window.Twitch.ext : null

// create the request options for our Twitch API calls
twitch.onContext(function(context) {
    twitch.rig.log(context)
})

twitch.configuration.onChanged(() => {

})

twitch.onAuthorized(function(auth) {
    // save our credentials
    token = auth.token
    tuid = auth.userId
})

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

$(function() {
    // listen for incoming broadcast message from our EBS
    twitch.listen('broadcast', function (target, contentType, color) {
        twitch.rig.log('Received broadcast')
    })
})
