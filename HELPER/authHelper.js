const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashingPassword = async (password) => {
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashPsw = await bcrypt.hash(password, saltRound);
    return hashPsw;
  } catch (error) {
    console.log("Error From Hashing Password : " + error);
  }
};

const comparingPassword = async (password, hashedPassword) => {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  } catch (error) {
    console.log("Error From Comparing Password: " + error);
  }
};

const token = async (email, id) => {
  try {
    return await jwt.sign(
      {
        email: email,
        id: id,
      },
      process.env.KEY,
      { expiresIn: "24h" }
    );
  } catch (error) {
    console.log("Error From JWT: " + error);
  }
};

module.exports = {
  hashingPassword,
  comparingPassword,
  token,
};
