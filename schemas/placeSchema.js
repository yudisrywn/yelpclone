const Joi = require("joi");
const Schema = require("mongoose");
// const Schema = mongoose.Schema;
module.exports.placeSchema = Joi.object({
  place: Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    image: Joi.string().required(),
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  }).required(),
});
