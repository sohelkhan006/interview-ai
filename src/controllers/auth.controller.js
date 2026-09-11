const userModel = require("../models/user.model");

/**
 * @name registerUserController
 * @discription register a new user, expects username , email and password in request body
 * @access public
 */

async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username, email and password",
    });
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    if (isUserAlreadyExists.username === username) {
      return res.status(400).json({
        message: "An account already exists with this username",
      });
    } else {
      return res.status(400).json({
        message: "An account already exists with this email",
      });
    }
  }
}

module.exports = {
  registerUserController,
};
