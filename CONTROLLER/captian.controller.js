const authHelper = require("../HELPER/authHelper");
const { validationResult } = require("express-validator");
const captainModel = require("../MODELS/captain.model");
const blackListTokenModel = require("../MODELS/blacklistModel");

const register = async (req, res) => {
  try {
    const { fullName, email, password, vehicles } = req.body;

    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!fullName || !email || !password || !vehicles) {
      return res.status(400).json({ message: "All Fields are Required" });
    }

    // Check Captain Already Exist
    const isCaptianExist = await captainModel.findOne({ email });
    if (isCaptianExist) {
      return res.status(400).json({ message: "Captain already exist" });
    }

    // Hashing the Passwword
    const hashedPassword = await authHelper.hashingPassword(password);

    // Creating the User In Database
    const user = await captainModel.create({
      fullName: {
        firstName: fullName.firstName,
        lastName: fullName.lastName,
      },
      email,
      password: hashedPassword,
      vehicles: {
        color: vehicles.color,
        plate: vehicles.plate,
        capacity: vehicles.capacity,
        vehicleType: vehicles.vehicleType,
      },
    });

    // Genrerate the Token
    const token = await authHelper.token(email, user._id.toString());

    // Give the Response
    res.status(201).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }

    if (!email || !password) {
      return res.status(400).json({ message: "All Fields are Required" });
    }

    // Check Captain Already Exist
    const user = await captainModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    // Password validation
    const result = await authHelper.comparingPassword(password, user.password);

    if (!result) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    // Genrerate the Token
    const token = await authHelper.token(email, user._id.toString());

    //Set Cookies
    res.cookie("token", token);

    // Give the Response
    res.status(201).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    res.status(200).json(req.captain);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    res.clearCookie("token");

    await blackListTokenModel.create({ token });

    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = { register, login, getUserProfile, logout };
