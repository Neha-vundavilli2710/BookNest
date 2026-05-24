import express from "express";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import User from "../models/User.js";

import authMiddleware from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// SIGNUP

router.post("/signup", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    // VALIDATION

    if (
      !name ||
      !email ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

    }

    // CHECK USER EXISTS

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "User already exists",
      });

    }

    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CREATE USER

    const newUser = new User({

      name: name.trim(),

      email: email.toLowerCase().trim(),

      password: hashedPassword,

    });

    await newUser.save();

    // GENERATE TOKEN

    const token = jwt.sign(

      {
        id: newUser._id,

        email: newUser.email,

        isAdmin: newUser.isAdmin,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }

    );

    res.status(201).json({

      success: true,

      message: "Signup Successful",

      token,

      user: {

        id: newUser._id,

        name: newUser.name,

        email: newUser.email,

        isAdmin: newUser.isAdmin,

      },

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

// LOGIN

router.post("/login", async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // VALIDATION

    if (
      !email ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });

    }

    // CHECK USER

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {

      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });

    }

    // CHECK PASSWORD

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });

    }

    // GENERATE TOKEN

    const token = jwt.sign(

      {
        id: user._id,

        email: user.email,

        isAdmin: user.isAdmin,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }

    );

    res.status(200).json({

      success: true,

      message: "Login Successful",

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        isAdmin: user.isAdmin,

      },

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

// GET ALL USERS (ADMIN ONLY)

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      const users = await User.find()
        .sort({ createdAt: -1 });

      res.status(200).json(users);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  }
);

// DELETE USER (ADMIN ONLY)

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      await User.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({

        success: true,

        message: "User Deleted Successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  }
);

export default router;