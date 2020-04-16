'use strict';

module.exports = {
  GetRoute(req, res, next) {
    res.status(200).json({
      title: "My personal project",
      version: "1.0.0",
      API: ["/status"]
    }).end();
  }
}
