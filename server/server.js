const express = require("express");
const http = require("http");
const enforce = require("express-sslify");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const path = require("path");
const { AwakeHeroku } = require("awake-heroku");
const _ = require("lodash");

AwakeHeroku.add({
  url: "https://smishy.herokuapp.com",
});

app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use(express.static("./client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
let i =0;
function tities(){

  if (i==0) {
    i=1;
    return;
  }
  if (i==1) {
    i=0;
    return;
  }
  if (i>1) {
    i=0;
    return;
  }
  if (i<0) {
    i=0;
    return;
  }
}

let users = [];
let queue = [];
const players = ['X','O'];

io.on("connection", (socket) => {
  let isBusy = false;

  if (!_.includes(users, socket.id)) {
    users.push(socket.id);
  }
  socket.emit("yourID", {
    id:socket.id,
    pivot:players[i],
  },tities() ) ;
  io.sockets.emit("allUsers", users);

  socket.on("disconnect", () => {
    _.pull(users, socket.id);

    const userInQueue = _.find(queue, u => u.id === socket.id);

    if (userInQueue) {
      _.remove(queue, {id: userInQueue.id});
      isBusy = false;
    }
  });

  socket.on("leaveQueue", () => {
    const userInQueue = _.find(queue, u => u.id === socket.id);

    if (userInQueue && isBusy) {
      isBusy = false;
      _.remove(queue, {id: userInQueue.id});
    }
  });

  socket.on("sendMessage", (data) => {
    socket.emit("messageSent", {
      message: data.message,
    });

    io.to(data.peerId).emit("receiveMessage", {
      message: data.message,
    });
  });

  socket.on("updateGrid", (data) => {
    socket.emit("historyUpdated", {
      historyPoint: data.historyPoint,
      squares: data.squares,
      setStepNumber: data.setStepNumber,
      xIsNext: data.xIsNext,
    });

    io.to(data.peerId).emit("receiveHistory", {
      historyPoint: data.historyPoint,
      squares: data.squares,
      setStepNumber: data.setStepNumber,
      xIsNext: data.xIsNext,
    });
  });

  socket.on("findPartner", (data) => {
    viablePartner = _.find(queue, u => {
      return u.id !== socket.id && u.onlyChat === data.onlyChat
    });

    if (!viablePartner && !isBusy) {
      isBusy = true;
      const userInQueue = _.find(queue, u => u.id === socket.id);
      if (!userInQueue) {
        queue.push({ id: socket.id, onlyChat: data.onlyChat });
      }
    } else if (!isBusy) {
      isBusy = true;
      _.remove(queue, {id: viablePartner.id});

      io.to(viablePartner.id).emit("peer", {
        peerId: socket.id,
        initiator: true,
      });

      socket.emit("peer", {
        peerId: viablePartner.id,
        initiator: false,
      });
    }
  });

  socket.on("signal", (data) => {
    if (!data.peerId) {
      return;
    }

    isBusy = false;
    io.to(data.peerId).emit("signal", {
      signal: data.signal,
      peerId: socket.id,
    });
  });

  // socket.on("close", (data) => {
  //   io.to(data.peerId).emit("close");
  // });
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
