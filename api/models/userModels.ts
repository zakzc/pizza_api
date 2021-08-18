import * as  mongoose from "mongoose";

const Schema = mongoose.Schema

 const userSchema: any = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    trim: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
  },
});

export const Users = new mongoose.Schema(userSchema)
