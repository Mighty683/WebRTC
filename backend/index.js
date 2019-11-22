'use strict';
var os = require('os');
var nodeStatic = require('node-static');
var http = require('http');
var socketIO = require('socket.io');
var fileServer = new(nodeStatic.Server)();
var PORT = 8080;

var RTCSessions = {};

var app = http.createServer(function(req, res) {
  fileServer.serve(req, res);
}).listen(PORT);

var io = socketIO.listen(app);

io.sockets.on('connection', function(socket) {
  socket.on('join_room', function({
    name,
    userName,
    sessionDescription
  }) {
    var room = io.sockets.adapter.rooms[name];
    var numClients = room ? Object.keys(room.sockets).length : 0;
    if (numClients === 0) {
      RTCSessions[name] = {
        [socket.id]: {
          name: userName,
          sessionDescription,
        }
      }
      socket.join(name);
      socket.emit('joined', RTCSessions[name], socket.id);
    } else {
      RTCSessions[name][socket.id] = {
        name: userName,
        sessionDescription,
      }
      io.sockets.in(name).emit('join', socket.id);
      socket.join(name);
      socket.emit('joined', RTCSessions[name], socket.id);
      io.sockets.in(room).emit('ready');
    }
  });
});