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

//middleware
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/places", async (req, res) => {
  const places = await Place.find();
  res.render("places/index", { places });
});
app.get("/places/create", async (req, res) => {
  res.render("places/create");
});
app.post("/places", async (req, res) => {
  const place = new Place(req.body.place);
  await place.save();
  res.redirect('/places');
});

app.get("/places/:id", async (req, res) => {
  const place = await Place.findById(req.params.id);
  res.render("places/show", { place });
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
