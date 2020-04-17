'use strict';
const { validator } = require('../../../utils');
const Card = require('../model');
require('dot_functions_utils');

module.exports = {
  ListCards(request, response, next) {
    Card
      .find()
      .select('-__v')
      .then((cards) => {
        response.status(200).json(cards).end();
      })
      .catch((error) => {
        response.status(400).json({
          message: "Error on find cards",
          error
        }).end();
      });
  },
  RegisterCard(request, response, next) {
    let cardValidator = new validator();
    let { cardName, dueDay, closureDay } = request.body;

    cardValidator.isRequired(cardName, 'Credit Card Name is required');
    cardValidator.isRequired(closureDay, 'Closure Date is required');
    cardValidator.isRequired(dueDay, 'Due Date is required');
    cardValidator.hasMinLen(closureDay, 1, 'Date string required in format dd or d');
    cardValidator.hasMinLen(dueDay, 1, 'Date string required in format dd or d');


    // Se os dados forem inválidos
    if (!cardValidator.isValid()) {
      response.status(400).send(cardValidator.errors()).end();
      return;
    }

    const card = new Card({
      name: cardName.captalizeAll(),
      dueDay: dueDay.twoDigits(),
      closureDay: closureDay.twoDigits(),
    });

    card
      .save()
      .then((result) => {
        response.status(201).json(result).end();
      })
      .catch((err) => {
        response.status(409).json({ error: err }).end();
      });
  },
  DeleteCard(request, response, next) {
    let { id } = request.params;

    Card
      .findById(id)
      .select('-__v')
      .then((card) => {
        Card
          .deleteOne({ _id: id })
          .then(
            response
              .status(200)
              .json({ message: "Deleted", card })
              .end()
          )
          .catch((error) => {
            response.status(400).json({
              message: "Error on delete card",
              error
            });
          })
      })
      .catch((error) => {
        response.status(400).json({
          message: "Error on find card",
          error
        }).end();
      });
  }
}
