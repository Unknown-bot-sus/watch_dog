const multer = require("multer");
const path = require("path");

// Set up the storage destination and file naming convention
const storage = multer.diskStorage({
  destination: "./videos",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() * Math.round(Math.random() * 1e3);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Filter for video files (optional but recommended)
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /mp4|avi|mkv|mov/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (mimetype && extname) {
      return cb(null, true);
  } else {
      cb(null, false);
  }
};


const upload = multer({
  storage,
  fileFilter
});

module.exports = {
  upload
}