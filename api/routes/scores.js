const express = require("express");
const router = express.Router();
const scoresController = require("../controllers/scores");

router.get("/", async (req, res) => {
    scoresController.index(req, res);
})
router.get("/:genre", scoresController.show);

module.exports = router;
