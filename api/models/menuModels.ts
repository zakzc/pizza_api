import * as mongoose from "mongoose"

const Schema = mongoose.Schema

const menuSchema: any = new Schema({
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

export const MenuList = new mongoose.Schema(menuSchema)
