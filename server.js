// load the variables from the .env file (so the password isn't in the code)
require("dotenv").config();


var path = require("path");

var express = require("express");
var cors = require("cors");
var MongoClient = require("mongodb").MongoClient;

var app = express();

// allow requests from other origins (our frontend on GitHub Pages)
app.use(cors());

// let the server read JSON sent in the body of requests
app.use(express.json());

// logger middleware: runs for every request and prints it to the console
app.use(function (request, response, next) {
  var time = new Date().toISOString();
  console.log(time + " | " + request.method + " " + request.url);
  next();
});

var client = new MongoClient(process.env.MONGODB_URI);
var db;

// folder where the lesson images are stored
var imagesPath = path.resolve(__dirname, "images");

// sends the image if it exists in the images folder
app.use("/images", express.static(imagesPath));

// if the image wasn't found above, send an error message
app.use("/images", function (request, response) {
  response.status(404).send("Image not found");
});

// test route
app.get("/", function (request, response) {
  response.send("After School API is running");
});

// connect to Atlas first, then start listening for requests
async function startServer() {
  await client.connect();
  db = client.db("afterschool");
  console.log("Connected to MongoDB Atlas");

  var port = process.env.PORT || 3000;
  app.listen(port, function () {
    console.log("App started on port " + port);
    console.log("Open http://localhost:" + port);
  });
}

startServer().catch(function (error) {
  console.log("Could not start server: " + error);
});