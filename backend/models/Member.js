const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true,
    unique: true
  },

  age: {
    type: Number,
    required: true
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"]
  },

  plan: {
    type: String,
    required: true
  },

  fees: {
    type: Number,
    required: true
  },

  joiningDate: {
    type: Date,
    default: Date.now
  },

  expiryDate: {
    type: Date
  },

  status: {
    type: String,
    default: "Active"
  }
},
{
  timestamps: true
});

module.exports = mongoose.model("Member", memberSchema);