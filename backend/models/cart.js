const mongoose = require('mongoose');

const cart = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  items: [{
    producto: {
      type: String,
      required: false
    },
    quantity: {
      type: Number,
      required: false
    }
  }]
});

const Cart = mongoose.model('Cart', cart, 'carts');

module.exports = Cart;