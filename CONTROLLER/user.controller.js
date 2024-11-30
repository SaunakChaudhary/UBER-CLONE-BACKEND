const authHelper = require("../HELPER/authHelper");
const { validationResult } = require("express-validator");
const userModel = require("../MODELS/user.model");

const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All Fields are Required" });
    }

    // Check User Already Exist
    const isUserAlready = await userModel.findOne({ email });

    if (isUserAlready) {
      return res.status(400).json({ message: "User already exist" });
    }

    // Hashing the Passwword
    const hashedPassword = await authHelper.hashingPassword(password);

    // Creating the User In Database
    const user = await userModel.create({
      fullName: {
        firstName: fullName.firstName,
        lastName: fullName.lastName,
      },
      email,
      password: hashedPassword,
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

    // Check User Already Exist
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    // password validation

    const result = await authHelper.comparingPassword(password, user.password);

    if (!result) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    // Genrerate the Token
    const token = await authHelper.token(email, user._id.toString());

    // Give the Response
    res.status(201).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { register , login};
