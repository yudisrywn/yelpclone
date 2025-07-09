const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

// Controller
const AuthController = require("../controller/AuthController");
router
  .route("/register")
  .get(AuthController.registerForm)
  .post(wrapAsync(AuthController.register));

router
  .route("/login")
  .get(AuthController.loginForm)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: {
        type: "error_msg",
        msg: "Invalid username or password",
      },
    }),
    AuthController.login
  );

router.post("/logout", AuthController.logout);

module.exports = router;
