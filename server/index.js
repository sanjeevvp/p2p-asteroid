var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

//game vars
var serverParticlePool;
var serverparticles;

var existing = false;
var serverbulletPool;
var serverbullets;

var players = 0;
var serverasteroidPool;
var serverasteroids;

var hScan;
var asteroidVelFactor = 0;

io.on("connection", function(socket) {
  socket.on("disconnect", function() {
    console.log("Player disconnected");
    players--;
  });
  console.log("Player Connected");
  players++;
  io.emit("init", { existing, players });
  if (existing) {
    io.emit("game", {
      serverParticlePool,
      serverparticles,
      serverbulletPool,
      serverbullets,
      serverasteroidPool,
      serverasteroids
    });
  } else {
    socket.on("asteroidInit", function(data) {
      const { asteroidPool, asteroids } = data;
      serverasteroids = asteroids;
      serverasteroidPool = asteroidPool;
      existing = true;
    });
    socket.on("bulletInit", function(data) {
      const { bulletPool, bullets } = data;
      serverbullets = bullets;
      serverbulletPool = bulletPool;
      existing = true;
    });
    socket.on("particleInit", function(data) {
      const { ParticlePool, particles } = data;
      serverparticles = particles;
      serverParticlePool = ParticlePool;
      existing = true;
    });
  }
  socket.on("update", function(data) {
    // console.log("update received from player");
    serverParticlePool = data.particlePool;
    serverparticles = data.particles;
    serverbulletPool = data.bulletPool;
    serverbullets = data.bullets;
    serverasteroidPool = data.asteroidPool;
    serverasteroids = data.asteroids;
    io.emit("clientUpdate", {
      serverParticlePool,
      serverparticles,
      serverbulletPool,
      serverbullets,
      serverasteroidPool,
      serverasteroids
    });
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
