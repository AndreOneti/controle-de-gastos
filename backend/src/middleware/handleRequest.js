const md5 = require('md5');

function passwordHash(req, res, next) {
  if (!!req.body.password)
    req.body.password = md5(req.body.password + process.env.SALT_KEY_HASH)
  next()
}

module.exports = passwordHash;
