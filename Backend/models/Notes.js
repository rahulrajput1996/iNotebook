const mongoose = require("mongoose");
const noteschema = new mongoose.Schema({
  myimportuser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "myusers",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const note = mongoose.model("mynotes", noteschema);
module.exports = note;
