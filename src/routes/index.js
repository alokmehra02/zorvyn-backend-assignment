const express = require("express");

const authRoutes = require("../modules/auth/auth.routes");
const userRoutes = require("../modules/users/user.routes");
const recordRoutes = require("../modules/records/record.routes");
const dashboardRoutes = require("../modules/dashboard/dashboard.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/records", recordRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;