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
      const {email, username, password} = req.body;
      const user = new User({email, username});
      await User.register(user, password);
      req.flash("success_msg", "You are register and can login");
      res.redirect("/login");
    } catch (error) {
      req.flash("error_msg", error.message);
      res.redirect("/register");
    }
  })
);

router.get("/login", async (req, res) => {
  res.render("auth/login");
});

router.post("/login", passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash : {
    type: 'error_msg',
    msg : "Invalid username or password"
  }
}), (req, res) => {
  req.flash("success_msg", "success login");
  res.redirect("/places")
})

module.exports = router;
