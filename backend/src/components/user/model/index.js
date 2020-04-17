'use strict';

const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  user: {
    type: String,
    unique: true,
    required: true,
  }
});

module.exports = model('User', schema);
