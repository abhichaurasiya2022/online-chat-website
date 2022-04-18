const express = require("express");
const http = require("http");
const enforce = require("express-sslify");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const path = require("path");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const db = require('./static/scripts/db');
const cors = require("cors");

dotenv.config({ path:'./.env' });

const _ = require("lodash");
const publicDirectory = path.join(__dirname, './static');

app.use(cors());
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cookieParser());
console.log(__dirname);

app.use('/', require('./static/scripts/routes'));
app.use('/api', require('./static/scripts/api'))
//app.use(express.static("./client/build"));

app.get("/test", (req, res) => {
  console.log("test");
  res.send("Hello");
});

db.connect( (error) => {
  if(error) {
    console.log(error)
  } else {
    console.log("MySQL Connected...")
  }
})




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


  socket.on("resetGrid", (data) => {
    socket.emit("resetGridDone");
    io.to(data.peerId).emit("resetGridDoneIo");
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

io.on('connection', (socket) => {
  console.log("connected");
    socket.emit('meReg', socket.id );

    socket.on('disconnectReg', () => {
        socket.broadcast.emit("callendedReg");
    });

    socket.on('disconnect', () => {
        console.log("dis");
    });

    socket.on("calluserReg", ({ userToCall, signalData, from, name}) => {
        io.to(userToCall).emit("calluserReg", {signal: signalData, from, name});
    });

    socket.on("answercallReg", (data) => {
        io.to(data.to).emit("callacceptedReg", data.signal);
    });


});



const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
