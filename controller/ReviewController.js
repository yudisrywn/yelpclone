// models
const Place = require("../models/place");
const Review = require("../models/review");

module.exports.store = async (req, res) => {
  const review = new Review(req.body.review);
  review.author = req.user._id;
  const place = await Place.findById(req.params.place_id);
  place.reviews.push(review);
  await review.save();
  await place.save();
  req.flash("success_msg", "succesfull review Place");
  res.redirect(`/places/${req.params.place_id}`);
};

module.exports.delete = async (req, res) => {
  const { place_id, review_id } = req.params;
  await Place.findByIdAndUpdate(place_id, {
    $pull: { reviews: review_id },
  });
  await Review.findByIdAndDelete(review_id);
  req.flash("error_msg", "succesfull delete Review");
  res.redirect(`/places/${place_id}`);
};
