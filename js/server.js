const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const players = {};

io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);

    players[socket.id] = { x: 50, y: 50 };

    socket.emit("currentPlayers", players);

    socket.broadcast.emit("newPlayer", { id: socket.id, x: 50, y: 50});

    socket.on("movePlayer", (data) => {
        if (players[socket.id]) {
            players[socket.id].x += data.dx;
            players[socket.id].y += data.dy;
            io.emit("updatePlayer", { id: socket.id, ...players[socket.id] });
        }
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected: ", socket.id);
        delete players[socket.id];
        io.emit("removePlayer", socket.id);
    });
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
})