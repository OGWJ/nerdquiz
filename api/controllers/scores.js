const Score = require("../models/score");

async function index(req, res) {
  console.log('controller index called')
  try {
    console.log('inside index try block')
    const scores = await Score.all;
    console.log('controller', scores);
    res.status(200).json(scores);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function show(req, res) {
  try {
    const score = await Score.findByGenre(req.params.genre);
    res.status(200).json(score);
  } catch (err) {
    res.status(404).json({ err });
  }
}

module.exports = { index, show };
