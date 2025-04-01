// const multer = require('multer');
// const path = require('path');

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

export const fileUpload = multer({ storage });

export const errorHandler = (err, req, res, next) => {
  res.status(500).json({ error: err.message });
};

// module.exports = { fileUpload, errorHandler };