'use strict';

const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  closureDay: {
    type: String,
    required: true
  },
  dueDay: {
    type: String,
    required: true
  }
});

module.exports = model('Card', schema);
