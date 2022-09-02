const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 150,
    // enum: [15, 25, 35, 40, 45, 50, 55, 60],
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  telephone: {
    type: String,
    unique: true,
    required: true,
    minLength: 10,
    maxLength: 14,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
const user = mongoose.model("myusers", userschema);
module.exports = user;
