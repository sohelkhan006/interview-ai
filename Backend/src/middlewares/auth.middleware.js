const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  // If token not found 
  if (!token) {
    return res.status(401).json({
      message: "Token is not provided.",
    });
  }

  // Check if token is blacklisted
  const isTokenblacklist = await tokenBlacklistModel.findOne({ token });

  if (isTokenblacklist) {
    return res.status(401).json({
      message: "Token is invalid.",
    });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // IF got the infor send it to User
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token.",
    });
  }
}

module.exports = { authUser };
