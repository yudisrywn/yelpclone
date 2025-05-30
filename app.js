const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const app = express();

//model
const Place = require("./models/place");

//connect ke database
mongoose
  .connect("mongodb://127.0.0.1/yelpclone")
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

//gunakan view engine ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

// app.get("/seed/place", async (req, res) => {
//   const place = new Place({
//     title: "Taman Nasional Bromo",
//     price: "Rp. 100.000",
//     description: "Tempat wisata yang indah di Jawa Timur",
//     location: "Jawa Timur, Indonesia",
//   });
//   await place.save();
//   res.send(place);
// });

app.listen(3000, () => {
  console.log("Server running on http://127.0.0.1:3000");
});
