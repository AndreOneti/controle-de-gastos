const notFound = (request, response, next) => {
  response.status(404).json({
    url: `${request.protocol}://${request.get('host')}${request.originalUrl}`,
    message: `Route to ${request.method} ${request.originalUrl} not found`
  });

  next && next();
}

module.exports = notFound;
