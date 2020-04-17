'use strict';
const { validator } = require('../../../utils');
const Owner = require('../model');
require('dot_functions_utils');

module.exports = {
  ListOwners(request, response, next) {
    Owner
      .find()
      .select('-__v')
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
  RegisterOwner(request, response, next) {
    let ownerValidator = new validator();
    let { name } = request.body;

    ownerValidator.isRequired(name, 'Owner Name is required');

    // Se os dados forem inválidos
    if (!ownerValidator.isValid()) {
      response.status(400).send(ownerValidator.errors()).end();
      return;
    }

    const owner = new Owner({
      name: name.captalizeAll()
    });

    owner
      .save()
      .then((result) => {
        response.status(201).json(result).end();
      })
      .catch((err) => {
        response.status(409).json({ error: err }).end();
      });
  },
  DeleteOwner(request, response, next) {
    let { id } = request.params;

    Owner
      .findById(id)
      .select('-__v')
      .then((owner) => {
        Owner
          .deleteOne({ _id: id })
          .then(
            response
              .status(200)
              .json({ message: "Deleted", owner })
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
