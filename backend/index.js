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
  }) {
    var room = io.sockets.adapter.rooms[name];
    var numClients = room ? Object.keys(room.sockets).length : 0;
    if (numClients === 0) {
      RTCSessions[name] = {
        [socket.id]: {
          name: userName,
        }
      }
      socket.join(name);
      socket.emit('joined', RTCSessions[name], socket.id);
    } else {
      RTCSessions[name][socket.id] = {
        name: userName,
      }
      io.sockets.in(name).emit('on_join', RTCSessions[name][socket.id]);
      socket.join(name);
      socket.emit('joined', RTCSessions[name], socket.id);
      io.sockets.in(room).emit('ready');
    }
  });

  socket.on('send_offer', function({
    offer,
    name,
    target
  }) {
    io.sockets.to(name).emit('on_offer', {
      offer,
      name,
      target
    });
  });

  socket.on('send_answer', function({
    offer,
    name,
    target
  }) {
    io.sockets.to(name).emit('on_answer', {
      answer,
      target
    });
  });
});