import "../db/mongoose.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import { Server } from "socket.io";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectory = path.join(__dirname, "../public");

app.use(express.static(publicDirectory));

// Creating server
const server = http.createServer(app);

// initialize socket.io with ES modules

const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  res.status(200).send("Welcome");
});

io.on("connection", () => {
  console.log("New websocket connection");
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
