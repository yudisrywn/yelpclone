const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router({ mergeParams: true });

// schema
const isAuth = require("../middlewares/isAuth");

// Controller
const ReviewController = require("../controller/ReviewController");

// middleware
const isValidObjectId = require("../middlewares/isValidObjectId");
const { isAuthorReview } = require("../middlewares/isAuthor");
const { validateReview } = require("../middlewares/validator");

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
