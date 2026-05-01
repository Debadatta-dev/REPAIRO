const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {

  try {

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token =
        req.headers.authorization.split(" ")[1];
    }

    if (!token) {

      return res.status(401).json({
        msg: "No token"
      });
    }

    console.log("TOKEN:");
    console.log(token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED:");
    console.log(decoded);

    const user =
      await User.findById(decoded.id)
        .select("-password");

    console.log("FOUND USER:");
    console.log(user);

    if (!user) {

      return res.status(401).json({
        msg: "User not found"
      });
    }

    req.user = user;

    next();

  } catch (err) {

    console.log(err);

    res.status(401).json({
      msg: "Token failed"
    });
  }
};

exports.authorize = (...roles) => {

  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {

      return res.status(403).json({
        msg: "Not allowed"
      });
    }

    next();
  };
};