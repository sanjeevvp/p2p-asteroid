const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const { createGameObject, createPlayerId } = require("./utils");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000;

var games = [];

app.get("/games", (req, res) => res.send(games));

app.post("/game/create", (req, res) => {
  const { gameName } = req.body;
  const gameObject = createGameObject(gameName);
  console.log("----------Object created------------");
  console.log(gameObject);
  games.push(gameObject);
  res.status(200).send(gameObject);
});

app.post("/game/add-player", (req, res) => {
  console.log("----------Adding player-------------");
  const { id } = req.body;
  games.filter(game => game.id === id);

  if (games.filter(game => game.id === id).length === 0) {
    res.sendStatus(401);
  }
  

  const playerId = createPlayerId(games.filter(game => game.id === id)[0]);
  games.filter(game => game.id === id)[0].players.push(playerId);

  res.send({ playerId });
  res.status(200);
});

app.post("/game/details", (req, res) => {
  res.send(games.filter(game => game.id === req.body.id)[0]);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
