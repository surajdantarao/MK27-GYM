const mongoose = require("mongoose");

const membershipPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    duration: {
      type: Number, // in months
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("MembershipPlan", membershipPlanSchema);