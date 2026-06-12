const express = require("express");
const Member = require("../models/Member");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ======================
// ADD MEMBER
// ======================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      phone,
      age,
      gender,
      plan,
      fees,
      expiryDate
    } = req.body;

    const member = new Member({
      name,
      phone,
      age,
      gender,
      plan,
      fees,
      expiryDate
    });

    await member.save();

    res.status(201).json({
      message: "Member Added Successfully",
      member
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});


// ======================
// GET ALL MEMBERS
// ======================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const members = await Member.find();

    res.status(200).json(members);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});


// ======================
// GET SINGLE MEMBER
// ======================
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        message: "Member Not Found"
      });
    }

    res.status(200).json(member);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});


// ======================
// UPDATE MEMBER
// ======================
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.__v;

    const member = await Member.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!member) {
      return res.status(404).json({
        message: "Member Not Found"
      });
    }

    res.status(200).json({
      message: "Member Updated Successfully",
      member
    });

  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Phone number already exists for another member"
      });
    }
    res.status(500).json({
      message: "Server Error"
    });
  }
});


// ======================
// DELETE MEMBER
// ======================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(
      req.params.id
    );

    if (!member) {
      return res.status(404).json({
        message: "Member Not Found"
      });
    }

    res.status(200).json({
      message: "Member Deleted Successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router;