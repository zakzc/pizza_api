const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    trim: true,
  },
  price: { type: Number, required: true },
  ingredients: { type: Array, required: true },
  chef: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 100,
    trim: true,
  },
});

module.exports = mongoose.model("MenuList", MenuSchema);
