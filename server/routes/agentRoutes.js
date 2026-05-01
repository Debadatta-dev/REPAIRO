const express = require("express");

const router = express.Router();

const {
  getTasks,
  updateStatus,
  login,
  changePassword,
  rejectTask,
  getProfile
} = require("../controllers/agentController");

const {
  protect,
  authorize
} = require("../middleware/auth");


// 🔹 GET TASKS
router.get(
  "/tasks",
  protect,
  authorize("agent"),
  getTasks
);


// 🔹 UPDATE STATUS
router.post(
  "/updatestatus",
  protect,
  authorize("agent"),
  updateStatus
);


// 🔐 LOGIN
router.post("/login", login);


// 👤 PROFILE
router.get(
  "/profile",
  protect,
  authorize("agent"),
  getProfile
);


// 🔑 CHANGE PASSWORD
router.post(
  "/changepassword",
  protect,
  authorize("agent"),
  changePassword
);


// ❌ REJECT TASK
router.post(
  "/rejecttask",
  protect,
  authorize("agent"),
  rejectTask
);

module.exports = router;