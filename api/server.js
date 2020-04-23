const express = require("express");

const Hobbits = require("../hobbits/hobbitsModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/hobbits", (req, res) => {
  Hobbits.getAll()
    .then((hobbits) => {
      res.status(200).json(hobbits);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

server.post("/hobbits", (req, res) => {
  const hobbit = req.body;

  Hobbits.insert(hobbit)
    .then((ids) => {
      res.status(201).json({ message: `You added a Hobbit to the Database` });
    })
    .catch((error) => {
      res.status(500).json({ error: `Internal Server Error` });
    });
});

module.exports = server;
