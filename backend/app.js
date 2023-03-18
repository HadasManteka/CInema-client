const express = require("express");
const app = express();
const cors = require('cors'); 
const { parse } = require("url")
const { WebSocketServer } = require('ws');
const mongoose = require("mongoose");
const { randomUUID } = require("crypto");
mongoose.connect("mongodb+srv://movies-atlas-db:yjP8NyM9kh4GX7H@cluster0.kdvj33y.mongodb.net/?retryWrites=true&w=majority")

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("homepage");
});

let httpServer = app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

app.use('/', require('./routes/movies'));
app.use('/', require('./routes/reviews'));
app.use('/', require('./routes/users'));

const wsServer = new WebSocketServer({ server: httpServer });
const clients = {};
wsServer.on('connection', function (connection, req) {
  console.log(`rRecieved a new connection.`);
  let userId = parse(req.url, true).query.userId;
  if (userId != 'undefined') { 
    clients[userId] = connection;
    Object.keys(clients).forEach(user => { 
      clients[user].send(Object.keys(clients).length);
    });
    console.log(`${userId} connected.`);
  };
})

app.post("/logout", async (req, res) => {
  let userId = parse(req.url, true).query.userId;
  if (userId != 'undefined') { 
    delete clients[userId];
    Object.keys(clients).forEach(user => { 
      clients[user].send(Object.keys(clients).length);
    });
    console.log(`${userId} disconnected.`);
    res.status(200);
  };
});

app.get('*', (req, res) => {
  res.statusCode = 404
  res.end()
})

module.exports = app;