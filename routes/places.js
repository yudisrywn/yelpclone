const express = require("express");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

// models
const Place = require("../models/place");
// schema
const { placeSchema } = require("../schemas/placeSchema");

// middleware
const validatePlace = (req, res, next) => {
  const { error } = placeSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    return next(new ExpressError(message, 400));
  } else {
    next();
  }
};

router.get("/", async (req, res) => {
  const places = await Place.find();
  res.render("places/index", { places });
});

router.get("/create", async (req, res) => {
  res.render("places/create");
});
router.post(
  "/",
  validatePlace,
  wrapAsync(async (req, res, next) => {
    const place = new Place(req.body.place);
    await place.save();
    req.flash("success_msg", "succesfull added Place");
    res.redirect("/places");
  })
);

router.get("/:id", async (req, res) => {
  const place = await Place.findById(req.params.id).populate("reviews");
  res.render("places/show", { place });
});

router.get("/:id/edit", async (req, res) => {
  const place = await Place.findById(req.params.id);
  res.render("places/edit", { place });
});
router.put(
  "/:id",
  validatePlace,
  wrapAsync(async (req, res) => {
    await Place.findByIdAndUpdate(req.params.id, { ...req.body.place });
    req.flash("success_msg", "succesfull added Place");
    res.redirect(`/places/${req.params.id}`);
  })
);
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    await Place.findByIdAndDelete(req.params.id);
    req.flash("error_msg", "succesfull delete Place");
    res.redirect("/places");
  })
);

module.exports = router;
