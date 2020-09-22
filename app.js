var express = require("express");
var socket = require("socket.io");

var app = express();

app.use(express.static("public"));

var server = app.listen(3000, function () {
  console.log("listening on port 3000");
});

var io = socket(server);

io.on("connection", function (socket) {
  console.log("made socket connection", socket.id);
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
