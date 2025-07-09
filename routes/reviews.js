const express = require("express");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router({ mergeParams: true });

// schema
const { reviewSchema } = require("../schemas/reviewSchema");
const isAuth = require("../middlewares/isAuth");

// Controller
const ReviewController = require("../controller/ReviewController");

// middleware
const isValidObjectId = require("../middlewares/isValidObjectId");
const { isAuthorReview } = require("../middlewares/isAuthor");
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
  wrapAsync(ReviewController.store)
);

router.delete(
  "/:review_id",
  isAuth,
  isAuthorReview,
  isValidObjectId("/places"),
  wrapAsync(ReviewController.delete)
);

module.exports = router;