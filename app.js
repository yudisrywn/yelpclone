const express = require("express");
const ejs = required("ejs");
const path = required("path");
const app = express();

//gunakan view engine ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(ejs);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("Server running on http://127.0.0.1:3000");
});
