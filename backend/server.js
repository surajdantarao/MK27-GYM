const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const memberRoutes = require("./routes/memberRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const planRoutes = require("./routes/planRoutes");
const membershipPlanRoutes = require("./routes/membershipPlanRoutes");
const progressRoutes = require("./routes/progressRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

app.use(cors());
require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("MK27 Gym Backend Running");
});

// Protected Route
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    user: req.user
  });
});

// User Routes
app.use("/api/users", userRoutes);

// Member Routes
app.use("/api/members", memberRoutes);

// Dashboard Routes
app.use("/api/dashboard", dashboardRoutes);

// Membership Plan Routes
app.use("/api/membership-plans", membershipPlanRoutes);

// Plan Routes
app.use("/api/plans", planRoutes);

// Progress Routes
app.use("/api/progress", progressRoutes);

// Notification Routes
app.use("/api/notifications", notificationRoutes);

// Server Start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});