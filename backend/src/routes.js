const express = require("express");
const app = express();

// Require moddleware
const { handleRequest, authorized, notFound } = require('./middleware');

// Require routes
const defaultRoute = require("./components/default/router");
const spending = require("./components/spending/router");
const status = require("./components/status/router");
const signup = require("./components/user/router");
const owner = require("./components/owner/router");
const card = require("./components/card/router");

app.use(handleRequest);
app.use('/', defaultRoute);
app.use('/status', status);
app.use('/user', signup);
app.use(authorized);
app.use('/card', card);
app.use('/owner', owner);
app.use('/spending', spending);
app.use(notFound);

// Export routes on app
module.exports = app;
