// js
// require("dotenv").config();
var import = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(key.twitter);

console.log("ERRTHANG");
console.log(import);
console.log("----------------------");

console.log("Spotify Results");
console.log(import.spotify);
console.log("----------------------");

console.log("Twitter Results");
console.log(import.client);
console.log("----------------------");
