'use strict';
const validator = require('../validator');
const User = require('../model');

module.exports = {
  GetRoute(req, res, next) {
    User
      .find()
      .select('-__v')
      .then((users) => {
        res.status(200).json(users).end();
      })
      .catch((error) => {
        res.status(400).json({
          message: "Error on find customer",
          error
        }).end();
      });
  },
  PostRoute(req, res, next) {
    let userValidator = new validator();
    let { email, name, password, user: usr } = req.body
    userValidator.isEmail(email, 'E-mail inválid');
    userValidator.isRequired(name, 'Name is required');
    userValidator.isRequired(usr, 'User is required');
    userValidator.isRequired(email, 'E-mail is required');
    userValidator.isRequired(password, 'Password is required');

    // Se os dados forem inválidos
    if (!userValidator.isValid()) {
      res.status(400).send(userValidator.errors()).end();
      return;
    }

    const user = new User({
      name,
      email,
      password,
      user: usr,
    });

    user
      .save()
      .then((result) => {
        res.status(201).json(result).end();
      })
      .catch((err) => {
        res.status(409).json({ error: err }).end();
      });
  }
}
