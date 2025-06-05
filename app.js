const ejsMate = require("ejs-mate");
const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrapAsync");
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
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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
app.post(
  "/places",
  wrapAsync(async (req, res, next) => {
    const placeSchema = Joi.object({
      place: Joi.object({
        title: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().min(0).required(),
        image: Joi.string().required(),
      }).required(),
    });

    const { error } = placeSchema.validate(req.body);
    if (error) {
      console.log(error);
      return next(new ExpressError(error, 400));
    }

    const place = new Place(req.body.place);
    await place.save();
    res.redirect("/places");
  })
);

app.get("/places/:id", async (req, res) => {
  const place = await Place.findById(req.params.id);
  res.render("places/show", { place });
});

app.get("/places/:id/edit", async (req, res) => {
  const place = await Place.findById(req.params.id);
  res.render("places/edit", { place });
});
app.put("/places/:id", async (req, res) => {
  await Place.findByIdAndUpdate(req.params.id, { ...req.body.place });
  res.redirect("/places");
});
app.delete("/places/:id", async (req, res) => {
  await Place.findByIdAndDelete(req.params.id);
  res.redirect("/places");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

//middleware error
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Somethings went wrong";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Server running on http://127.0.0.1:3000");
});
