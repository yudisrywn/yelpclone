const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const isValidObjectId = require("../middlewares/isValidObjectId");
const isAuth = require("../middlewares/isAuth");
const { isAuthorPlace } = require("../middlewares/isAuthor");
const router = express.Router();

// controller
const PlaceController = require("../controller/PlaceController");

// middleware
const { validatePlace } = require("../middlewares/validator");

router
  .route("/")
  .get(wrapAsync(PlaceController.index))
  .post(isAuth, validatePlace, wrapAsync(PlaceController.store));

router.get("/create", isAuth, async (req, res) => {
  res.render("places/create");
});

router
  .route("/:id")
  .get(isValidObjectId("/places"), wrapAsync(PlaceController.show))
  .put(
    isAuth,
    isAuthorPlace,
    isValidObjectId("/places"),
    validatePlace,
    wrapAsync(PlaceController.update)
  )
  .delete(
    isAuth,
    isAuthorPlace,
    isValidObjectId("/places"),
    wrapAsync(PlaceController.delete)
  );

router.get(
  "/:id/edit",
  isAuth,
  isAuthorPlace,
  isValidObjectId("/places"),
  PlaceController.edit
);

module.exports = router;
