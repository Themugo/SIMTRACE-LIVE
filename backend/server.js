import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.json({ status: "SimTrace API running" });
});

// RECEIVE TRACKING DATA
app.post("/track", (req, res) => {
  const data = req.body;

  console.log("Incoming:", data);

  io.emit("location_update", data);

  res.json({ success: true });
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
