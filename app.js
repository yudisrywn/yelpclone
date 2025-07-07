const ejsMate = require("ejs-mate");
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const ejs = require("ejs");
const path = require("path");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local");

// model
const User = require("./models/user");

//connect ke database
mongoose
  .connect("mongodb://127.0.0.1/yelpclone")
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

//gunakan view engine ejs
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "this-is-a-secret-key", //bebas
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: Date.now() + 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", async (req, res) => {
  const user = new User({
    email: "user@gmail.com",
    username: "user",
  });

  const newUser = await User.register(user, "password");
  res.send(newUser);
});

app.use("/places", require("./routes/places"));
app.use("/places/:place_id/reviews", require("./routes/reviews"));

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

//middleware error
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Somethings went wrong";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Server running on http://127.0.0.1:3000");
});
