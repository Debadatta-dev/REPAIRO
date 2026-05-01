const RepairRequest = require("../models/RepairRequest");
const allowedTransitions = require("../utils/statusFlow");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// 🔹 GET ALL TASKS (ACTIVE + HISTORY)
exports.getTasks = async (req, res) => {
  try {
    const tasks = await RepairRequest.find({
      agentId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(tasks);

  } catch (err) {
    res.status(500).json({
      msg: err.message
    });
  }
};

// 🔹 UPDATE STATUS
exports.updateStatus = async (req, res) => {

  try {

    const { requestId, status } = req.body;

    const request = await RepairRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        msg: "Request not found"
      });
    }

    // ONLY ASSIGNED AGENT
    if (!request.agentId) {
      return res.status(400).json({
        msg: "No agent assigned"
      });
    }

    if (request.agentId.toString() !== req.user.id) {
      return res.status(403).json({
        msg: "Not your task"
      });
    }

    // VALIDATE FLOW
    const currentStatus = request.status;

    const allowed =
      allowedTransitions[currentStatus];

    if (!allowed || !allowed.includes(status)) {
      return res.status(400).json({
        msg: `Cannot move from ${currentStatus} to ${status}`
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

// 🔐 LOGIN
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    res.json({
      message: "Agent login successful",
      token: "dummy-token"
    });

  } catch (err) {
    res.status(500).json({
      msg: err.message
    });
  }
};

// 👤 PROFILE

// 🔑 CHANGE PASSWORD
exports.changePassword = async (req, res) => {
  try {

    const { oldPassword, newPassword } = req.body;

    res.json({
      message: "Password updated"
    });

  } catch (err) {
    res.status(500).json({
      msg: err.message
    });
  }
};

// ❌ REJECT TASK
exports.rejectTask = async (req, res) => {
  try {

    const { requestId } = req.body;

    res.json({
      message: "Task rejected",
      requestId
    });

  } catch (err) {
    res.status(500).json({
      msg: err.message
    });
  }
};


//get agent profile
exports.getProfile = async (req, res) => {

  try {

    const agent = await User.findById(req.user.id)
      .select("-password");

    if (!agent) {
      return res.status(404).json({
        msg: "Agent not found"
      });
    }

    res.json(agent);

  } catch (err) {

    res.status(500).json({
      msg: err.message
    });
  }
};



// CHANGE PASSWORD
exports.changePassword = async (req, res) => {

  try {

    const {
      oldPassword,
      newPassword
    } = req.body;

    const agent = await User.findById(req.user.id);

    if (!agent) {
      return res.status(404).json({
        msg: "Agent not found"
      });
    }

    // CHECK OLD PASSWORD
    const isMatch =
      await bcrypt.compare(
        oldPassword,
        agent.password
      );

    if (!isMatch) {
      return res.status(400).json({
        msg: "Old password incorrect"
      });
    }

    // HASH NEW PASSWORD
    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    agent.password = hashedPassword;

    await agent.save();

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