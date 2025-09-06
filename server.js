const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

let players = {};

io.on("connection", (socket) => {
  console.log("A player connected:", socket.id);

  players[socket.id] = { x: 100, y: 100 };

  // Send current players to new player
  socket.emit("currentPlayers", players);

  // Notify others of new player
  socket.broadcast.emit("newPlayer", { id: socket.id, x: 100, y: 100 });

  // Movement
  socket.on("move", (data) => {
    if (players[socket.id]) {
      players[socket.id].x = data.x;
      players[socket.id].y = data.y;
      io.emit("playerMoved", { id: socket.id, x: data.x, y: data.y });
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("A player disconnected:", socket.id);
    delete players[socket.id];
    io.emit("playerDisconnected", socket.id);
  });
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
