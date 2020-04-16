'use stict'

// Dependencies
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const mongoose = require("mongoose");
const router = require('./routes');
require("dotenv").config();

// Create server
const app = express();

// Disable x powered
app.disable('x-powered-by');

// Mongoose connection
mongoose.connect(process.env.MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
    return;
  }
  console.log('Connected');
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Set routes
app.use('/', router);

module.exports = app;
