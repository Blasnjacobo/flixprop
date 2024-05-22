const mongoose = require("mongoose");

const user = new mongoose.Schema({
  id : { type: String, index: true },
  name: String,
  username: { type: String, index: true },
  photos: [{
    value: String
  }],
  provider: String
  },
  {
    timestamps: true
  });

module.exports.User = mongoose.model('User', user, 'users')