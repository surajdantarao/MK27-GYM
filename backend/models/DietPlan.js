const mongoose = require("mongoose");

const dietPlanSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },
  meals: [{
    time: String, // Breakfast, Lunch...
    foodItems: String,
    calories: Number
  }],
  totalCalories: Number,
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  assignedDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model("DietPlan", dietPlanSchema);
