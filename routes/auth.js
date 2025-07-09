const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

const User = require("../models/user");

router.get("/register", async (req, res) => {
  res.render("auth/register");
});

router.post(
  "/register",
  wrapAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registerUser = await User.register(user, password);
      req.login(registerUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success_msg", "You are register and logged");
        res.redirect("/places");
      });
    } catch (error) {
      req.flash("error_msg", error.message);
      res.redirect("/register");
    }
  })
);

router.get("/login", async (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: {
      type: "error_msg",
      msg: "Invalid username or password",
    },
  }),
  (req, res) => {
    req.flash("success_msg", "success login");
    res.redirect("/places");
  }
);

router.post("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "You're logout");
    res.redirect("/login");
  });
});

module.exports = router;
