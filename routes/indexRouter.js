const express = require("express");
const router = express.Router();
const controller = require('../controllers/indexController');

router.get("/", controller.indexGet);

module.exports = router;