'use strict';
var os = require('os');
var nodeStatic = require('node-static');
var http = require('http');
var socketIO = require('socket.io');
var fileServer = new(nodeStatic.Server)();

var PORT = 8080;

var app = http.createServer(function(req, res) {
  fileServer.serve(req, res);
}).listen(PORT);

var io = socketIO.listen(app);

io.sockets.on('connection', function(socket) {
  // Join to room
  socket.on('join_room', function({
    name,
  }) {
    var room = io.sockets.adapter.rooms[name];
    var numClients = room ? Object.keys(room.sockets).length : 0;
    if (numClients === 0) {
      socket.join(name);
      socket.emit('joined', io.sockets.adapter.rooms[name].sockets, socket.id);
    } else {
      socket.join(name);
      socket.emit('joined', io.sockets.adapter.rooms[name].sockets, socket.id);
    }
    io.sockets.to(name).emit('on_join', {
      id: socket.id
    });
  });

  socket.on('send_offer', function({
    offer,
    roomName,
    target
  }) {
    console.log(`User name ${socket.id} send offer to  ${target}`);
    io.sockets.to(roomName).emit('on_offer', {
      offer,
      id: socket.id,
      target
    });
  });

  socket.on('send_answer', function({
    answer,
    roomName,
    target,
  }) {
    console.log(`User name ${socket.id} send answer to  ${target}`);
    io.sockets.to(roomName).emit('on_answer', {
      answer,
      id: socket.id,
      target
    });
  });
});
