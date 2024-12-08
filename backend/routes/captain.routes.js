import express from "express";
import { getcaptainProfile, loginCaptain, logoutCaptain, registerCaptain } from "../controllers/captain.controller.js";
import { body } from "express-validator";
import { captainMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail(),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),
    body("fullname.lastname")
      .optional() // Allow optional last name
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Vehicle color must be at least 3 characters"),
    body("vehicle.plate")
      .isLength({ min: 6 })
      .withMessage("Vehicle plate number must be at least 6 characters"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Vehicle capacity must be a positive integer"),
    body("vehicletype")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage(
        "Vehicle type must be one of 'car', 'motorcycle', or 'auto'"
      ),
  ],
  registerCaptain
);

router.post(
  "/login",
 [ body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")],loginCaptain
);

router.get('/logout',captainMiddleware,logoutCaptain)


router.get('/profile',captainMiddleware,getcaptainProfile)


export default router;
