'use strict';
const { validator } = require('../../../utils');
const User = require('../model');

module.exports = {
  ListUsers(request, response, next) {
    User
      .find()
      .select('-__v')
      .then((users) => {
        response.status(200).json(users).end();
      })
      .catch((error) => {
        response.status(400).json({
          message: "Error on find user",
          error
        }).end();
      });
  },
  CreateUser(request, response, next) {
    let userValidator = new validator();
    let { email, name, password, user: usr } = request.body
    userValidator.isEmail(email, 'E-mail inválid');
    userValidator.isRequired(name, 'Name is required');
    userValidator.isRequired(usr, 'User is required');
    userValidator.isRequired(email, 'E-mail is required');
    userValidator.isRequired(password, 'Password is required');

    // Se os dados forem inválidos
    if (!userValidator.isValid()) {
      response.status(400).send(userValidator.errors()).end();
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
        response.status(201).json(result).end();
      })
      .catch((err) => {
        response.status(409).json({ error: err }).end();
      });
  },
  LoginUser(request, response, next) {
    let userValidator = new validator();
    let { password, user: usr } = request.body
    userValidator.isRequired(usr, 'User is required');
    userValidator.isRequired(password, 'Password is required');

    // Se os dados forem inválidos
    if (!userValidator.isValid()) {
      response.status(400).send(userValidator.errors()).end();
      return;
    }

    User
      .findOne({ user: usr })
      .then((user) => {
        if (user) {
          if (user.password === password) {
            response
              .status(200)
              .cookie('authorized', true)
              .json({ message: "User loged now" })
              .end();
          }
          else {
            response.status(400).json({
              message: "Invalid password!"
            }).end();
          }
        } else {
          response.status(400).json({
            message: "User not registered"
          }).end();
        }
      })
      .catch((error) => {
        response.status(400).json({
          message: "Error on find user",
          error
        }).end();
      });
  },
  LogoutUser(request, response, next) {
    response
      .status(200)
      .clearCookie('authorized')
      .json({ message: "User down now" })
      .end();
  }
}
