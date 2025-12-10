import express from 'express'
import { WebSocketServer, WebSocket } from 'ws'

const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (msg) => {
    console.log("Message:", msg.toString());
    socket.send("Echo: " + msg);
  });
});

app.listen(4000, () => {
  console.log("HTTP:  http://localhost:4000");
  console.log("WS:    ws://localhost:4000");
});