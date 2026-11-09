require("dotenv").config();
var MongoClient = require("mongodb").MongoClient;

// the lessons we want in the database
var lessons = [
  { topic: "Math", location: "Hendon", price: 100, space: 5, image: "math.png" },
  { topic: "Math", location: "Colindale", price: 80, space: 5, image: "math.png" },
  { topic: "English", location: "Hendon", price: 90, space: 5, image: "english.png" },
  { topic: "English", location: "Brent Cross", price: 85, space: 5, image: "english.png" },
  { topic: "Piano", location: "Golders Green", price: 120, space: 5, image: "piano.png" },
  { topic: "Football", location: "Hendon", price: 60, space: 5, image: "football.png" },
  { topic: "Art", location: "Colindale", price: 75, space: 5, image: "art.png" },
  { topic: "Science", location: "Brent Cross", price: 95, space: 5, image: "science.png" },
  { topic: "Drama", location: "Golders Green", price: 70, space: 5, image: "drama.png" },
  { topic: "Coding", location: "Hendon", price: 110, space: 5, image: "coding.png" }
];

async function addLessons() {
  var client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  var db = client.db("afterschool");
  await db.collection("lessons").deleteMany({});
  await db.collection("lessons").insertMany(lessons);
  console.log("Added " + lessons.length + " lessons");
  await client.close();
}

addLessons().catch(function (error) {
  console.log("Failed: " + error);
});