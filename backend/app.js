require("dotenv").config();
const express = require("express");
const db = require("./util/db");
const bodyParser = require("body-parser");
const authEndpoints = require("./endpoints/authEndpoints");
const userEndpoints = require("./endpoints/userEndpoints");
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(bodyParser.json());
app.use(authEndpoints);
app.use(userEndpoints);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

db.sync()
  .then(success => {
    console.log("Server Listening!");
    app.listen(8000);
  })
  .catch(err => {
    console.log("Error setting up server!");
    console.log(err);
  });

module.exports = app;
