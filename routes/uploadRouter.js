const express = require("express");
const router = express.Router();
const multer  = require('multer')
const path = require("path");
const controller = require("../controllers/uploadController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `uploads/${req.body.folder.name}`);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get original file extension
    const baseName = path.basename(file.originalname, ext);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ storage: storage });

router.get("/", controller.uploadGet);

router.post("/", upload.single('file'), controller.uploadPost);

module.exports = router;