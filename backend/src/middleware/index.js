const handleRequest = require('./handleRequest');
const authorized = require('./authorized');
const notFound = require('./notFound');

module.exports = {
  handleRequest,
  authorized,
  notFound
}
