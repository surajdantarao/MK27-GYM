const mongoose = require("mongoose");

const workoutPlanSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },
  workoutDays: [{
    day: { type: String, required: true }, // Monday, Tuesday...
    exercises: [{
      name: { type: String, required: true },
      sets: String,
      reps: String,
      notes: String
    }]
  }],
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  assignedDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model("WorkoutPlan", workoutPlanSchema);
