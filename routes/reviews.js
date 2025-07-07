const express = require("express");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const isValidObjectId = require("../middlewares/isValidObjectId");

const router = express.Router({ mergeParams: true });

// models
const Place = require("../models/place");
const Review = require("../models/review");

// schema
const { reviewSchema } = require("../schemas/reviewSchema");
const isAuth = require("../middlewares/isAuth");

// middleware
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    return next(new ExpressError(message, 400));
  } else {
    next();
  }
};

// routes
router.post(
  "/",
  isAuth,
  isValidObjectId("/places"),
  validateReview,
  wrapAsync(async (req, res) => {
    const review = new Review(req.body.review);
    const place = await Place.findById(req.params.place_id);
    place.reviews.push(review);
    await review.save();
    await place.save();
    req.flash("success_msg", "succesfull review Place");
    res.redirect(`/places/${req.params.place_id}`);
  })
);

router.delete(
  "/:review_id",
  isAuth,
  isValidObjectId("/places"),
  wrapAsync(async (req, res) => {
    const { place_id, review_id } = req.params;
    await Place.findByIdAndUpdate(place_id, {
      $pull: { reviews: review_id },
    });
    await Review.findByIdAndDelete(review_id);
    req.flash("error_msg", "succesfull delete Review");
    res.redirect(`/places/${place_id}`);
  })
);

module.exports = router;
