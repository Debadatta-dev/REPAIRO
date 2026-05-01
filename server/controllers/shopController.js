const RepairRequest = require("../models/RepairRequest");
const allowedTransitions = require("../utils/statusFlow");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");


exports.viewRepairRequests = async (req, res) => {
  try {
    const requests = await RepairRequest.find({
      shopId: req.user.id
    });

    res.json(requests);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🔐 Signup

// 🔐 Login

// 👤 Profile

// 🔑 Change Password

// 📦 View Repair Requests

// ❌ Cancel Repair
exports.cancelRepair = async (req, res) => {
  const { requestId } = req.body;

  res.json({
    message: "Repair request cancelled",
    requestId
  });
};


// 🚚 Assign Pickup Agent
exports.assignPickupAgent = async (req, res) => {
  try {
    const { requestId, agentId } = req.body;

    if (!agentId) {
      return res.status(400).json({ msg: "Agent required" });
    }

    const request = await RepairRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ msg: "Request not found" });
    }

    if (request.shopId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not your request" });
    }

    request.agentId = agentId;

    if (request.status === "pending") {
      request.status = "pickup_assigned";
    } else if (request.status === "repaired") {
      request.status = "return_assigned";
    }

    await request.save();

    res.json({
      message: "Agent assigned",
      request
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// 🛠️ Send Repair Info
exports.sendRepairInfo = asyncHandler(async (req, res) => {
  const { requestId, issue, cost } = req.body;

  const request = await RepairRequest.findById(requestId);

  if (!request) {
    const err = new Error("Request not found");
    err.statusCode = 404;
    throw err;
  }

  if (!allowedTransitions[request.status].includes("diagnosed")) {
    const err = new Error(
      `Cannot move from ${request.status} to diagnosed`
    );
    err.statusCode = 400;
    throw err;
  }

  request.diagnosis = { issue, cost };
  request.status = "diagnosed";

  await request.save();

  res.json({
    message: "Diagnosis sent",
    request
  });
});


//get all agents
exports.getAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: "agent" }).select("name _id");
    res.json(agents);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


//update repair request
exports.updateRepairStatus = async (req, res) => {

  try {

    const { requestId, status } = req.body;

    const request =
      await RepairRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        msg: "Request not found"
      });
    }

    if (request.shopId.toString() !== req.user.id) {
      return res.status(403).json({
        msg: "Not your request"
      });
    }

    request.status = status;

    await request.save();

    res.json({
      message: "Status updated",
      request
    });

  } catch (err) {

    res.status(500).json({
      msg: err.message
    });
  }
};


//shop profile

exports.getProfile = async (req, res) => {

  try {

    const shop = await User.findById(req.user.id)
      .select("-password");

    if (!shop) {
      return res.status(404).json({
        msg: "Shop not found"
      });
    }

    res.json(shop);

  } catch (err) {

    res.status(500).json({
      msg: err.message
    });
  }
};



//change password
// CHANGE PASSWORD
exports.changePassword = async (req, res) => {

  try {

    const {
      oldPassword,
      newPassword
    } = req.body;

    const shop = await User.findById(req.user.id);

    if (!shop) {
      return res.status(404).json({
        msg: "Shop not found"
      });
    }

    // CHECK OLD PASSWORD
    const isMatch =
      await bcrypt.compare(
        oldPassword,
        shop.password
      );

    if (!isMatch) {
      return res.status(400).json({
        msg: "Old password incorrect"
      });
    }

    // HASH NEW PASSWORD
    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    shop.password = hashedPassword;

    await shop.save();

    res.json({
      message: "Password changed successfully"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      msg: err.message
    });
  }
};