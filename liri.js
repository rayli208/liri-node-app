require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var keys = require("./keys.js");
var moment = require('moment');
var fs = require("fs");
var action = process.argv[2];
var nodeArgs = process.argv;
var value = '';

for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    value = value + " " + nodeArgs[i];
  } else {
    value += nodeArgs[i];
  }
}

 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});

// The switch-case will direct which function gets run.
switch (action) {
  case "concert-this":
    concertThis(value);
    break;

  case "spotify-this-song":
    spotifyThisSong(value);
    break;

  case "movie-this":
    movieThis(value);
    break;

  case "do-what-it-says":
    doWhatItSays(value);
    break;
}


function concertThis(value) {
  axios.get(`https://rest.bandsintown.com/artists/${value}/events?app_id=codingbootcamp`).then(
    function (response) {
      console.log("Band Info for: " + value);
      console.log("Venue: " + response.data[0].venue.name);
      console.log("Venue Location: " + response.data[0].venue.city);
      var date = response.data[0].datetime;
      var a = moment(date).format("MM/DD/YYYY");
      console.log(a);

    }
  );
}

spotify
  .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
  .then(function(data) {
    console.log(data); 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });


function movieThis(value) {
  axios.get(`http://www.omdbapi.com/?t=${value}&y=&plot=short&apikey=trilogy`).then(
    function (response) {
      console.log("Name of movie: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("Language: " + response.data.Language);
      console.log("Country Filmed: " + response.data.Country);
      console.log("Plot of movie: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    }
  );
}