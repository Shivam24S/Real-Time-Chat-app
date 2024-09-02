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

  socket.emit("message", "Welcome");
  socket.broadcast.emit("message", "A new user has joined");

  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });

  socket.on("shareLocation", (lat, lon) => {
    io.emit("message", `https://google.com/maps/?q=${lat},${lon}`);
  });

  socket.on("disconnect", () => {
    io.emit("message", "user has left");
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
