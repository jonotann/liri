
require("dotenv").config();

// Modules
var spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys");
var fs = require("fs");

var spotify = new spotify(keys.spotify);

// Array to store arguments
var nodeArgs = process.argv;
var pick = process.argv[2];

// Empty var for user input
var inputText = "";

// Loop for the words within the argument
// Loop for inclusion of the plus sign within arguements
for (var i = 3; i < nodeArgs.length; i++) {

    if ((i > 3) && (i < nodeArgs.length)) {

        inputText = inputText + "+" + nodeArgs[i];

    } else {

        inputText += nodeArgs[i];

    }
}

// Switch in place to perform different actions when needed

switch (pick) {

    case "spotify-this-song":

        if (inputText) {

            music(inputText);

        } else {
            music("Panic Switch")

        };

        break;

    case "movie-this":

        if (inputText) {

            omdb(inputText);

        } else {

            omdb("Transformers")

        };

        break;

    case "do-what-it-says":

        fakeSiri();

        break;

};

// Music func
function music(song) {

    spotify.search({
        type: "track",
        query: song
    }, function (error, data) {
        if (!error) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var songdata = data.tracks.items[i];

                // Prints song info to terminal when requested

                console.log("____________________________");
                console.log("Track Name: " + songdata.name);
                console.log("Artist: " + songdata.artists[0].name);
                console.log("Album: " + songdata.album.name);
                console.log("URL: " + songdata.preview_url);
                console.log("____________________________");

                // Adds song info to txt

                log("____________________________");
                log("Track Name: " + songdata.name);
                log("Artist: " + songdata.artists[0].name);
                log("Album: " + songdata.album.name);
                log("URL: " + songdata.preview_url);
                log("____________________________");
            }

        } else {
            console.log("Spotify ERROR 404")
        }
    });
}

// Movie func
function omdb(movieName) {
    // API linking, with key passed
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // Debug
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        // If successful
        if (!error && response.statusCode === 200) {

            // Prints movie info to terminal when requested
            console.log("____________________________");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            console.log("Country of Production: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("____________________________");

            // Adds movie info to txt file
            log("____________________________");
            log("Title: " + JSON.parse(body).Title);
            log("Release Year: " + JSON.parse(body).Year);
            log("IMDB Rating: " + JSON.parse(body).imdbRating);
            log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            log("Country of Production: " + JSON.parse(body).Country);
            log("Language: " + JSON.parse(body).Language);
            log("Plot: " + JSON.parse(body).Plot);
            log("Actors: " + JSON.parse(body).Actors);
            log("____________________________");
        } else {
            console.log("OMDB ERROR 404");
        }

        if (movieName === "Transformers") {
            console.log("Auto-bots, roll out!");

            log("Auto-bots, roll out!");
        }

    });
}

// Read txt 

function fakeSiri() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        
        var txt = data.split(',');
        music(txt[1]);
    });
}

// Append to txt 
function log(logging) {
    fs.appendFile("log.txt", logging, function (error) {
        if (error) {
            throw error;
        }
    });
}

