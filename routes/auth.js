const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");

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
      res.redirect("/places");
    } catch (error) {
      req.flash("error_msg", error.message);
      res.redirect("/register");
    }
  })
);

module.exports = router;
