const User = require("../models/User");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");

const RepairRequest = require("../models/RepairRequest");
const asyncHandler = require("../middleware/asyncHandler");

const allowedTransitions = require("../utils/statusFlow");



// CREATE REQUEST

exports.createRepairRequest = asyncHandler(async (req, res) => {

  try {

    const {
      description,
      shopId
    } = req.body;

    console.log("CREATE REQUEST BODY:");
    console.log(req.body);

    console.log("REQ USER:");
    console.log(req.user);

    const imageUrl = req.file
      ? "uploaded-image-placeholder"
      : req.body.imageUrl;

    const request =
      await RepairRequest.create({

        userId: req.user._id,
        shopId,
        description,
        imageUrl,
        status: "pending"
      });

    console.log("CREATED REQUEST:");
    console.log(request);

    res.json({
      message: "Repair request created",
      request
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: err.message
    });
  }
});

// 🔐 Signup
exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    const err = new Error("User already exists");
    err.statusCode = 400;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  res.json({
    message: "User created",
    user
  });
});


// 🔐 Login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error("Invalid email");
    err.statusCode = 400;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error("Invalid password");
    err.statusCode = 400;
    throw err;
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

res.json({
  message: "Login successful",
  token,
  user: {
    id: user._id,
    role: user.role,
    name: user.name
  }
});
});


// 👤 Profile
exports.getProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user.id)
    .select("-password");

  if (!user) {
    return res.status(404).json({
      msg: "User not found"
    });
  }

  res.json(user);
});


// decision


exports.userDecision = asyncHandler(async (req, res) => {
  const { requestId, decision } = req.body;

  const request = await RepairRequest.findById(requestId);

  if (!request) {
    const err = new Error("Request not found");
    err.statusCode = 404;
    throw err;
  }

  // 🔒 ensure correct user
  if (request.userId.toString() !== req.user.id) {
    const err = new Error("Not your request");
    err.statusCode = 403;
    throw err;
  }

  // 🔁 validate transition
  if (!allowedTransitions[request.status].includes(decision)) {
    const err = new Error(
      `Cannot move from ${request.status} to ${decision}`
    );
    err.statusCode = 400;
    throw err;
  }

  request.status = decision;
  await request.save();

  res.json({
    message: "Decision updated",
    request
  });
});

// all requests
exports.getUserRequests = asyncHandler(async (req, res) => {

  console.log("==============");
  console.log("REQ USER:");
  console.log(req.user);

  const allRequests =
    await RepairRequest.find({});

  console.log("ALL REQUESTS:");
  console.log(allRequests);

  const requests =
    await RepairRequest.find({
      userId: req.user._id
    }).sort({ createdAt: -1 });

  console.log("FILTERED REQUESTS:");
  console.log(requests);

  res.json(requests);
});



//get all shops
// GET /user/shops
exports.getAllShops = asyncHandler(async (req, res) => {
  const shops = await User.find({ role: "shop" }).select("name _id");
  res.json(shops);
});


// user approval
exports.makeDecision = async (req, res) => {
  try {
    const { requestId, decision } = req.body;

    const request = await RepairRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ msg: "Request not found" });
    }

    if (request.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not your request" });
    }

    if (request.status !== "diagnosed") {
      return res.status(400).json({
        msg: "Request is not ready for approval"
      });
    }

   if (decision === "approved") {
      request.status = "repair_in_progress";
    } else {
      request.status = "rejected";
    }

    await request.save();

    res.json({
      message: `Request ${decision}`,
      request
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};



//change password
// CHANGE PASSWORD
exports.changePassword = asyncHandler(async (req, res) => {

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      msg: "All fields required"
    });
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      msg: "User not found"
    });
  }

  // CHECK OLD PASSWORD
  const isMatch = await bcrypt.compare(
    oldPassword,
    user.password
  );

  if (!isMatch) {
    return res.status(400).json({
      msg: "Old password incorrect"
    });
  }

  // HASH NEW PASSWORD
  const hashedPassword = await bcrypt.hash(
    newPassword,
    10
  );

  user.password = hashedPassword;

  await user.save();

  res.json({
    message: "Password updated successfully"
  });

});
