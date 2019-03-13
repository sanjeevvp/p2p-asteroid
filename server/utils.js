var uniqid = require("uniqid");

function createGameObject(name) {
  const id = uniqid();
  const players = [];
  return { id, name, players };
}

function createPlayerId(gameObject) {
  const gameId = gameObject.id;
  const playerNumber = gameObject.players.length + 1;
  return `${gameId}-player-${playerNumber}`;
}
module.exports = { createGameObject, createPlayerId };
