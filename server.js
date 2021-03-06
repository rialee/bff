// dependencies 
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

// PORT setup
const PORT = process.env.PORT || 3000;

// express server
const app = express();

// logger
app.use(logger("dev"));

// middleware
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static files from public folder
app.use(express.static("public"));

// mongoose connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {

  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false

});

// routes
app.use(require("./routes/api.js"));

// app listener on PORT
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});