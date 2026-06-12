const express = require("express");
const MembershipPlan = require("../models/MembershipPlan");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Get all plans (Public or Auth)
router.get("/", async (req, res) => {
  try {
    const plans = await MembershipPlan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Admin: Add Plan
router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const plan = new MembershipPlan(req.body);
    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Admin: Update Plan
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const plan = await MembershipPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Admin: Delete Plan
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied" });
    }

    await MembershipPlan.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Plan deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;