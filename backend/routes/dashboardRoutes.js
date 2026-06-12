const express = require("express");
const Member = require("../models/Member");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats", authMiddleware, async (req, res) => {
  try {

    const totalMembers = await Member.countDocuments();

    const activeMembers = await Member.countDocuments({
      expiryDate: { $gte: new Date() }
    });

    const expiredMembers = await Member.countDocuments({
      expiryDate: { $lt: new Date() }
    });

    const revenueData = await Member.find();

    const totalRevenue = revenueData.reduce(
      (sum, member) => sum + member.fees,
      0
    );

    res.status(200).json({
      totalMembers,
      activeMembers,
      expiredMembers,
      totalRevenue
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router;