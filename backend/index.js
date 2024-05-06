const express = require("express");
const errorHandler = require("./middlewares/errorMiddleware");
const connectDB = require("./config/connection");
require("dotenv").config();
require("colors");
const cors = require("cors");
const app = express();

app.use(cors());

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`server started on port:${process.env.PORT.blue}`)
);
