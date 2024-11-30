const userModel = require("../MODELS/user.model");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require("../MODELS/blacklistModel");

const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const isBlacklisted = await blackListTokenModel.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decode = await jwt.verify(token, process.env.KEY);
    const user = await userModel.findById(decode.id);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = { authUser };
