module.exports = (req, res, next) => {
  if(!req.isAuthenticated()){
    req.flash("error_msg", "You're not login");
    return res.redirect("/login");
  }
  next();
}