import "../db/mongoose.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectory = path.join(__dirname, "../public");

app.use(express.static(publicDirectory));
app.use(cors());

// Creating server
const server = http.createServer(app);

// initialize socket.io with ES modules

const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  res.status(200).send("Welcome");
});

io.on("connection", (socket) => {
  console.log("New websocket connection");
  //   let count = 0;
  //   socket.emit("countUpdated", count);

  //   socket.on("increment", () => {
  //     count++;
  //     //   now for individual
  //     //   socket.emit("countUpdated", count);
  //     // for every other socket

  //     io.emit("countUpdated", count);
  //   });

  socket.emit("message", "Welcome");

  socket.on("sendMessage", (message) => {
    // console.log(message);
    io.emit("message", message);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
