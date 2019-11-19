let token, userId;

var twitch = window.Twitch ? window.Twitch.ext : null

twitch.onContext((context) => {
  twitch.rig.log(context);
});

twitch.onAuthorized((auth) => {
  token = auth.token;
  userId = auth.userId;
});


