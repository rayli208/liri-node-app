require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var keys = require("./keys.js");
var moment = require('moment');
var fs = require("fs");
var action = process.argv[2];
var nodeArgs = process.argv;
var value = '';
var spotify = new Spotify(keys.spotify);


for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    value = value + " " + nodeArgs[i];
  } else {
    value += nodeArgs[i];
  }
}



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
    doWhatItSays();
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

function spotifyThisSong(value) {
  if (!value){
    value = "Ace of Base";
  }
  spotify
    .search({
      type: 'track',
      query: `${value}`
    })
    .then(function (response) {
      console.log("Artists include: ")
      for(i= 0; i < response.tracks.items[0].artists.length; i++){
        console.log(response.tracks.items[0].artists[i].name);
      }
      console.log('------------');
      console.log("Name of song:");
      console.log(response.tracks.items[0].name);
      console.log('------------');
      console.log("Preview Link:");
      console.log(response.tracks.items[0].preview_url);
      console.log('------------');
      console.log("Album:");
      console.log(response.tracks.items[0].album.name);
    })
}


function movieThis(value) {
  if (!value){
    value = "Mr\. Nobody";
  }
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

function doWhatItSays(){
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
    var dataArr = data.split(",");
    var funk = dataArr[0];
    var variable = dataArr[1];
    switch (funk) {
      case "concert-this":
        concertThis(variable);
        break;
    
      case "spotify-this-song":
        spotifyThisSong(variable);
        break;
    
      case "movie-this":
        movieThis(variable);
        break;
    
      case "do-what-it-says":
        doWhatItSays();
        break;
    }
  })
}
