const Score = require("../models/score");

async function index(req, res) {
  try {
    const scores = await Score.all;
    res.status(200).json(scores);
  } catch (err) {
    res.status(500).json({ err });
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

// async function create(req, res) {
//   try {
//     const score = await Score.create(req.body);
//     res.status(201).json(score);
//   } catch (err) {
//     res.status(422).json({ err });
//   }
// }

module.exports = { index, create, show };
