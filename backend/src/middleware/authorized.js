const notFound = (request, response, next) => {

  let authorized;

  if (request.headers.cookie)
    authorized = request.headers.cookie.split(';').find(cookie => cookie.includes('authorized'));

  if (authorized !== undefined) {
    if (authorized.split('=')[1]) {
      next && next();
    } else {
      response
        .status(404)
        .json({ message: "Not authorized" })
        .end();
    }
  } else {
    response
      .status(404)
      .json({ message: "Not authorized" })
      .end();
  }
}

module.exports = notFound;
