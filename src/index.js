import "../db/mongoose.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const publicDirectory = path.join(__dirname, "../public");

app.use(express.static(publicDirectory));

const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  res.status(200).send("Welcome");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
