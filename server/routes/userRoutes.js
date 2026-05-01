const express = require("express");

const router = express.Router();

const {
  signup,
  login,
  getProfile,
  createRepairRequest,
  getUserRequests,
  getAllShops,
  makeDecision,
  changePassword
} = require("../controllers/userController");

const {
  protect,
  authorize
} = require("../middleware/auth");

const upload =
  require("../middleware/upload");


// SIGNUP
router.post(
  "/signup",
  signup
);

// LOGIN
router.post(
  "/login",
  login
);

// PROFILE
router.get(
  "/profile",
  protect,
  getProfile
);

// CREATE REQUEST
router.post(
  "/createrepairrequest",
  protect,
  upload.single("image"),
  createRepairRequest
);

// GET ALL USER REQUESTS
router.get(
  "/repairstatus",
  protect,
  getUserRequests
);

// GET SHOPS
router.get(
  "/shops",
  protect,
  getAllShops
);

// DECISION
router.post(
  "/decision",
  protect,
  authorize("user"),
  makeDecision
);


//change password
router.post(
  "/changepassword",
  protect,
  authorize("user"),
  changePassword
);

module.exports = router;