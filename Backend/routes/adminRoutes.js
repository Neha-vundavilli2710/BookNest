import express from "express";

import Book from "../models/Book.js";

import User from "../models/User.js";

import Order from "../models/Order.js";

const router = express.Router();


// ADMIN DASHBOARD STATS

router.get("/stats", async (req, res) => {

  try {

    // TOTAL BOOKS

    const totalBooks =
      await Book.countDocuments();

    // TOTAL USERS

    const totalUsers =
      await User.countDocuments();

    // TOTAL ORDERS

    const totalOrders =
      await Order.countDocuments();

    // ALL ORDERS

    const orders =
      await Order.find();

    // TOTAL REVENUE

    const totalRevenue = orders.reduce(

      (total, order) =>

        total + order.totalPrice,

      0

    );

    // RECENT ORDERS

    const recentOrders =
      await Order.find()

        .sort({ createdAt: -1 })

        .limit(5);

    res.status(200).json({

      totalBooks,

      totalUsers,

      totalOrders,

      totalRevenue,

      recentOrders,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message,

    });

  }

});

export default router;