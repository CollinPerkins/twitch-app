$(document).ready(function () {
  var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "comster404", "brunofin", "noobs2ninjas"];

  for (var i = 0; i < streamers.length; i++) {
    $.getJSON('https://api.twitch.tv/kraken/streams/' + streamers[i] + '?callback=?', function(data) {
      if(!data.error){
        var streamerData = data._links.channel;
        var streamer = streamerData.slice(38, streamerData.length);

        if(data.stream === null){
          offlineOrDeleted(streamer, "Streamer is offline", "http://www.twitch.tv/" + streamer)

        }  else {
          offlineOrDeleted(streamer, data.stream.channel.game + " - " + data.stream.channel.status, "http://www.twitch.tv/" + streamer);
        }
      } else {
        var streamerData = data.message;
        var streamer = streamerData.slice(9, streamerData.length).split("").reverse().join("").slice(16, streamerData.length).split("").reverse().join("");
        offlineOrDeleted(streamer, "User does not exsist or has been deleted!", 'https://s.codepen.io/FreeCodeCamp/fullpage/undefined');
      }
    });
  }
})

function offlineOrDeleted(streamer, status, link){
  $('#list').append(
    '<div>' +
      '<h1><a href="' + link + '">' + streamer + '</a></h1>' +
      '<p>' + status + '</p>' +
    '</div>'
  )
}
