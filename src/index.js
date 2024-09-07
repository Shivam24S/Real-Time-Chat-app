import "../db/mongoose.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { Filter } from "bad-words";
import { generateMessages, generateLocation } from "../utils/messages.js";
import { addUsers, getUser, removeUser } from "../utils/users.js";

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

  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUsers({ id: socket.id, username, room });

    if (error) {
      return callback(error);
    }
    socket.join(user.room);
    socket.emit("message", generateMessages(`welcome ${user.username}!`));
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        generateMessages(user.username, `${user.username} has joined`)
      );

    callback();

    // socket.emit() =>specific client

    // io.emit() =>every client

    // socket.broadcast.emit()=>every connected client expect one the client who initiated

    // now for socket room

    // socket.to().emit =>specific client in that room

    // socket.broadcast.to().emit() =>every connected client in room expect one the client who initiated
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profanity message found ");
    }

    io.to(user.room).emit("message", generateMessages(user.username, message));

    callback();
  });

  socket.on("shareLocation", (lat, lon, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit(
      "location-url",
      generateLocation(
        user.username,
        `https://google.com/maps/?q=${lat},${lon}`
      )
    );
    callback("location received");
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessages(`${user.username} has left.`)
      );
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
