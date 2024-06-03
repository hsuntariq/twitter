const express = require("express");
const errorHandler = require("./middlewares/errorMiddleware");
const connectDB = require("./config/connection");
require("dotenv").config();
require("colors");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

app.use(cors());

// create an http server
const server = http.createServer(app);

// cors configuration,socket server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
  },
});

// check for an active connection

io.on("connection", (socket) => {
  console.log(`User connected on id:${socket.id.cyan}`);

  socket.on("message", (data) => {
    socket.broadcast.emit("received_message", data);
  });
});

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tweets", require("./routes/tweetRoutes"));

app.use(errorHandler);

server.listen(process.env.PORT, () =>
  console.log(`server started on port:${process.env.PORT.blue}`)
);
