const express = require("express");
const Notification = require("../models/Notification");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Create Notification
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { memberId, title, message } = req.body;
    const notification = new Notification({
      memberId,
      title,
      message
    });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get Notifications for Member
router.get("/:memberId", authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({ memberId: req.params.memberId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Mark as Read
router.put("/:id/read", authMiddleware, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
