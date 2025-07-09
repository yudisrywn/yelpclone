const Place = require("../models/place");

module.exports.index = async (req, res) => {
  const places = await Place.find();
  res.render("places/index", { places });
};

module.exports.store = async (req, res, next) => {
  const place = new Place(req.body.place);
  await place.save();
  req.flash("success_msg", "succesfull added Place");
  res.redirect("/places");
};

module.exports.show = async (req, res) => {
  const place = await Place.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  res.render("places/show", { place });
};

module.exports.edit = async (req, res) => {
  const place = await Place.findById(req.params.id);
  res.render("places/edit", { place });
};

module.exports.update = async (req, res) => {
  await Place.findByIdAndUpdate(req.params.id, { ...req.body.place });
  req.flash("success_msg", "succesfull updated Place");
  res.redirect(`/places/${req.params.id}`);
};

module.exports.delete = async (req, res) => {
  await Place.findByIdAndDelete(req.params.id);
  req.flash("error_msg", "succesfull delete Place");
  res.redirect("/places");
};
