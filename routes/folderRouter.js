const express = require("express");
const router = express.Router();
const controller = require("../controllers/folderController")

// router.get("/", controller.folderGet);

router.post("/create", controller.folderPost);

router.get("/create", controller.folderCreateGet);

router.get("/:folderId", controller.folderGet);

module.exports = router;