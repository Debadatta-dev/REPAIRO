const express = require("express");
const router = express.Router();

const {
  viewRepairRequests,
  assignPickupAgent,
  sendRepairInfo,
  getAgents,
  updateRepairStatus,
  getProfile,
  changePassword
} = require("../controllers/shopController");

const { protect, authorize } = require("../middleware/auth");


router.post("/sendrepairinfo", protect, authorize("shop"), sendRepairInfo);
router.get("/viewrepairrequests", protect, authorize("shop"), viewRepairRequests);

// 🔐 Auth

// 👤 Profile

// 🔑 Change Password


// 📦 View Repair Requests

// ❌ Cancel Repair

// 🚚 Assign Pickup Agent
router.post("/assignpickupagent", protect, authorize("shop"), assignPickupAgent);

// 🛠️ Send Repair Info (diagnosis + cost)


//get all agents
router.get("/agents", protect, authorize("shop"), getAgents);

//update Repair Status
router.post("/updatestatus", protect, authorize("shop"), updateRepairStatus);

//get shop profile
router.get(
  "/profile",
  protect,
  authorize("shop"),
  getProfile
);


// CHANGE PASSWORD
router.post(
  "/changepassword",
  protect,
  authorize("shop"),
  changePassword
);

module.exports = router;