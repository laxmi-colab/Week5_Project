const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");

const { body, validationResult } = require("express-validator");

const router = express.Router();

// ================= REGISTER =================

router.post(
  "/register",

  body("email").isEmail().withMessage("Enter Valid Email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
      });
    }

    try {
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        email,
        password: hashedPassword,
      });

      await user.save();

      console.log("User Registered:", email);

      res.status(201).json({
        message: "Registration Successful",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// ================= LOGIN =================

router.post(
  "/login",

  body("email").isEmail().withMessage("Enter Valid Email"),

  body("password").notEmpty().withMessage("Password is Required"),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
      });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          message: "Invalid Email",
        });
      }

      console.log("Entered Password:", password);
      console.log("Stored Hash:", user.password);

      const match = await bcrypt.compare(password, user.password);

      console.log("Password Match:", match);

      if (!match) {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.status(200).json({
        message: "Login Successful",
        token,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// ================= GOOGLE LOGIN =================

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false,
  }),
  (req, res) => {
    res.send("Google Login Successful");
  }
);

// ================= PROFILE =================

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;