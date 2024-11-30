const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../CONTROLLER/captian.controller");
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
      body("vehicles.color")
        .isLength({ min: 3 })
        .withMessage("Color must be at least 3 characters long"),
      body("vehicles.plate")
        .isLength({ min: 3 })
        .withMessage("Number Plate must be at least 3 characters long"),
      body("vehicles.capacity")
        .isInt({ min: 1 })
        .withMessage("Capacity must be at least 1"),  
      body("vehicles.vehicleType")
        .isIn(["car", "motorcycle", "auto"])
        .withMessage("Invalid Vehicle Type"),
    ],
    captainController.register
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
    captainController.login
  );

router
  .route("/profile")
  .get(authMiddleware.authCaptain, captainController.getUserProfile);

router.route("/logout").get(authMiddleware.authCaptain, captainController.logout);

module.exports = router;
