'use strict';
const { validator } = require('../../../utils');
const Spending = require('../model');
require('dot_functions_utils');

module.exports = {
  ListSpending(request, response, next) {
    Spending
      .find()
      .select('-__v')
      .populate('ownerId')
      .populate('cardId')
      .then((owners) => {
        response.status(200).json(owners).end();
      })
      .catch((error) => {
        response.status(400).json({
          message: "Error on find owners",
          error
        }).end();
      });
  },
  RegisterSpending(request, response, next) {
    let spendingValidator = new validator();
    let { ownerId, cardId, value, name } = request.body;

    spendingValidator.isRequired(ownerId, 'OwnerId is required');
    spendingValidator.isRequired(cardId, 'CardId is required');
    spendingValidator.isRequired(value, 'Value is required');
    spendingValidator.isRequired(name, 'Name is required');

    // Se os dados forem inválidos
    if (!spendingValidator.isValid()) {
      response.status(400).send(spendingValidator.errors()).end();
      return;
    }

    const spending = new Spending({
      ownerId,
      cardId,
      value,
      name
    });

    spending
      .save()
      .then((result) => {
        response.status(201).json(result).end();
      })
      .catch((err) => {
        response.status(409).json({ error: err }).end();
      });
  },
  DeleteSpending(request, response, next) {
    let { id } = request.params;

    Spending
      .findById(id)
      .select('-__v')
      .then((spending) => {
        Spending
          .deleteOne({ _id: id })
          .then(
            response
              .status(200)
              .json({ message: "Deleted", owner: spending })
              .end()
          )
          .catch((error) => {
            response.status(400).json({
              message: "Error on delete owner",
              error
            });
          })
      })
      .catch((error) => {
        response.status(400).json({
          message: "Error on find owner",
          error
        }).end();
      });
  }
}
