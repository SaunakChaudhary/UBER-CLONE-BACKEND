const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../CONTROLLER/user.controller");
const authMiddleware = require("../MIDDLEWARE/authMiddleware");

router
  .route("/register")
  .post(
    [
      body("email").isEmail().withMessage("Invalid Email"),
      body("fullName.firstName")
        .isLength({ min: 3 })
        .withMessage("First name must be at least 3 characters long"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    ],
    userController.register
  );

router
  .route("/login")
  .post(
    [
      body("email").isEmail().withMessage("Invalid Email"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    ],
    userController.login
  );

router
  .route("/profile")
  .get(authMiddleware.authUser, userController.getUserProfile);

router.route("/logout").get(authMiddleware.authUser,userController.logout);

module.exports = router;
