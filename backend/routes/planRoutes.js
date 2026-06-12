const express = require("express");
const WorkoutPlan = require("../models/WorkoutPlan");
const DietPlan = require("../models/DietPlan");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// ======================
// WORKOUT PLANS
// ======================

// Assign/Update Workout Plan
router.post("/workout", authMiddleware, async (req, res) => {
  try {
    const { memberId, workoutDays } = req.body;
    
    let plan = await WorkoutPlan.findOne({ memberId });
    if (plan) {
      plan.workoutDays = workoutDays;
      plan.assignedBy = req.user.id;
      plan.assignedDate = Date.now();
      await plan.save();
    } else {
      plan = new WorkoutPlan({
        memberId,
        workoutDays,
        assignedBy: req.user.id
      });
      await plan.save();
    }
    
    res.status(200).json({ message: "Workout plan updated", plan });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get Workout Plan for Member
router.get("/workout/:memberId", authMiddleware, async (req, res) => {
  try {
    const plan = await WorkoutPlan.findOne({ memberId: req.params.memberId });
    res.status(200).json(plan || { workoutDays: [] });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ======================
// DIET PLANS
// ======================

// Assign/Update Diet Plan
router.post("/diet", authMiddleware, async (req, res) => {
  try {
    const { memberId, meals, totalCalories } = req.body;
    
    let plan = await DietPlan.findOne({ memberId });
    if (plan) {
      plan.meals = meals;
      plan.totalCalories = totalCalories;
      plan.assignedBy = req.user.id;
      plan.assignedDate = Date.now();
      await plan.save();
    } else {
      plan = new DietPlan({
        memberId,
        meals,
        totalCalories,
        assignedBy: req.user.id
      });
      await plan.save();
    }
    
    res.status(200).json({ message: "Diet plan updated", plan });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get Diet Plan for Member
router.get("/diet/:memberId", authMiddleware, async (req, res) => {
  try {
    const plan = await DietPlan.findOne({ memberId: req.params.memberId });
    res.status(200).json(plan || { meals: [] });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
