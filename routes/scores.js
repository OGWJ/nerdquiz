const express = require("express");
const router = express.Router();
const scoresController = require("../controllers/scores");

router.get("/", scoresController.index);
router.get("/:genre", scoresController.show);
router.post("/", scoresController.create);

module.exports = router;
