import express from "express";

import Order from "../models/Order.js";

import authMiddleware from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// PLACE ORDER

router.post(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        user,
        items,
        totalPrice,
        shippingInfo,
      } = req.body;

      // VALIDATION

      if (
        !user ||
        !items ||
        items.length === 0 ||
        !totalPrice ||
        !shippingInfo
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid order data",

        });

      }

      // CREATE ORDER

      const order = new Order({

        user,

        items,

        totalPrice,

        shippingInfo,

      });

      await order.save();

      res.status(201).json({

        success: true,

        message:
          "Order Placed Successfully",

        order,

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

// GET MY ORDERS

router.get(
  "/myorders",
  authMiddleware,
  async (req, res) => {

    try {

      const userEmail =
        req.user.email
          .toLowerCase()
          .trim();

      const orders =
        await Order.find({
          "shippingInfo.email":
            userEmail,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json(
        orders
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  }
);

// GET ALL ORDERS (ADMIN ONLY)

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      const orders =
        await Order.find()
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        orders
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  }
);

// UPDATE ORDER STATUS (ADMIN ONLY)

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      const { status } = req.body;

      // VALIDATE STATUS

      const allowedStatuses = [
        "Processing",
        "Delivered",
        "Cancelled",
      ];

      if (
        !allowedStatuses.includes(status)
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid order status",

        });

      }

      const updatedOrder =
        await Order.findByIdAndUpdate(

          req.params.id,

          {
            status,
          },

          {
            new: true,
          }

        );

      res.status(200).json({

        success: true,

        message:
          "Order Status Updated",

        updatedOrder,

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