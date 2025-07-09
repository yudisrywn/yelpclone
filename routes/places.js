const express = require("express");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const isValidObjectId = require("../middlewares/isValidObjectId");
const isAuth = require("../middlewares/isAuth");
const { isAuthorPlace } = require("../middlewares/isAuthor");
const router = express.Router();

// schema
const { placeSchema } = require("../schemas/placeSchema");

// controller
const PlaceController = require("../controller/PlaceController");

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

router.get("/", wrapAsync(PlaceController.index));

router.get("/create", isAuth, async (req, res) => {
  res.render("places/create");
});
router.post("/", isAuth, validatePlace, wrapAsync(PlaceController.store));

router.get("/:id", isValidObjectId("/places"), wrapAsync(PlaceController.show));

router.get(
  "/:id/edit",
  isAuth,
  isAuthorPlace,
  isValidObjectId("/places"),
  PlaceController.edit
);
router.put(
  "/:id",
  isAuth,
  isAuthorPlace,
  isValidObjectId("/places"),
  validatePlace,
  wrapAsync(PlaceController.update)
);
router.delete(
  "/:id",
  isAuth,
  isAuthorPlace,
  isValidObjectId("/places"),
  wrapAsync(PlaceController.delete)
);

module.exports = router;