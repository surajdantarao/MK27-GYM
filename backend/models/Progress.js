const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },
  weight: Number,
  targetWeight: Number,
  bodyFat: Number,
  bmi: Number,
  photoUrl: String,
  caption: String,
  isPublic: {
    type: Boolean,
    default: false
  },
  progressDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model("Progress", progressSchema);
