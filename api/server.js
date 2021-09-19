const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());

scoreRoutes = require("./routes/scores");
server.use("/scores", scoreRoutes);

server.get("/", (req, res) => res.send("Welcome to the Quiz Game!"));

module.exports = server;
