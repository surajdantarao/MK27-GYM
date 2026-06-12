const express = require("express");
const Progress = require("../models/Progress");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Get Public Transformations
router.get("/public/transformations", async (req, res) => {
  try {
    const transformations = await Progress.find({ isPublic: true, photoUrl: { $exists: true, $ne: "" } })
      .populate("memberId", "name")
      .sort({ progressDate: -1 });
    res.status(200).json(transformations);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Log Progress
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { memberId, weight, targetWeight, bodyFat, bmi, photoUrl, caption, isPublic } = req.body;
    const progress = new Progress({
      memberId,
      weight,
      targetWeight,
      bodyFat,
      bmi,
      photoUrl,
      caption,
      isPublic
    });
    await progress.save();
    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get Progress for Member
router.get("/:memberId", authMiddleware, async (req, res) => {
  try {
    const progress = await Progress.find({ memberId: req.params.memberId }).sort({ progressDate: -1 });
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
