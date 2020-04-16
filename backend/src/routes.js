const express = require("express");
const app = express();

// Require moddleware
const { handleRequest, notFound } = require('./middleware');

// Require routes
const defaultRoute = require("./components/default/router");
const status = require("./components/status/router");
const signup = require("./components/signup/router");

app.use(handleRequest);
app.use('/', defaultRoute);
app.use('/status', status);
app.use('/signup', signup);
app.use(notFound);

// Export routes on app
module.exports = app;
