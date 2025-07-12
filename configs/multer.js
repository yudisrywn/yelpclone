const multer = require("multer");
const path = require("path");
const ExpressError = require("../utils/ExpressError");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "public/images/"); //direktori menyimpan gambar
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    ); //format nama file
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (file.mimetype.startsWith("image/")) {
      callback(null, true);
    } else {
      callback(new ExpressError("Only images are allowed", 405));
    }
  },
});

module.exports = upload;
