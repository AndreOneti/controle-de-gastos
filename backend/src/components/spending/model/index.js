'use strict';

const { Schema, model } = require('mongoose');

const schema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Owner'
  },
  cardId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Card'
  },
  value: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = model('Spending', schema);
