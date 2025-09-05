const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let players = {};

io.on("connection", (socket) => {
  console.log("New player:", socket.id);
  players[socket.id] = { x: 100, y: 100 };

  socket.emit("currentPlayers", players);
  socket.broadcast.emit("newPlayer", { id: socket.id, x: 100, y: 100 });

  socket.on("move", (data) => {
    if (players[socket.id]) {
      players[socket.id] = data;
      io.emit("playerMoved", { id: socket.id, ...data });
    }
  });

  socket.on("disconnect", () => {
    console.log("Player left:", socket.id);
    delete players[socket.id];
    io.emit("playerDisconnected", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
