import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (msg) => {
    console.log("Message:", msg.toString());
    socket.send("Echo: " + msg.toString());
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(4000, () => {
  console.log("HTTP: http://localhost:4000");
  console.log("WS:   ws://localhost:4000");
});