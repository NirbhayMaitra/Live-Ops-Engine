const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const SERVER_PORT = process.env.PORT || 8080; //(taking port from env file)If it is a part of environment file then take it from env file, or take it from 8080
const app = express();
const userRoutes = require("./routes/user");
const offerRoutes = require("./routes/offer")

mongoose
  .connect("mongodb://localhost:27017/user")
  .then(() => {
    console.log("Successfully connected to db");
  })
  .catch(() => {
    console.log("failed to connect with database");
  });

  //before processing any req, use body-parser
  app.use(bodyParser.json());

app.listen(SERVER_PORT, () => {
  console.log("Server has Started at" + " " + SERVER_PORT);
});

app.use("/user", userRoutes);
app.use("/offer",offerRoutes);

