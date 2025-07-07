const mongoose = require("mongoose");

module.exports = (redirectUrl = "/") => {
  return async (req, res, next) => {
    const paramsId = ["id", "place_id", "review_id"].find(
      (param) => req.params[param]
    );

    if (!paramsId) {
      return next();
    }

    const id = req.params[paramsId];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash("error_msg", "Data tidak ditemukan");
      return res.redirect(redirectUrl);
    }
    next();
  };
};
