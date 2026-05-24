import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(

  {

    user: {
      type: String,
      required: [true, "User is required"],
      trim: true,
    },

    items: [

      {

        title: {
          type: String,
          required: true,
          trim: true,
        },

        author: {
          type: String,
          required: true,
          trim: true,
        },

        price: {
          type: Number,
          required: true,
          min: [1, "Price must be greater than 0"],
        },

        image: {
          type: String,
          required: true,
          trim: true,
        },

      },

    ],

    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [1, "Total price must be greater than 0"],
    },

    shippingInfo: {

      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      address: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

    },

    status: {

      type: String,

      enum: [
        "Processing",
        "Delivered",
        "Cancelled",
      ],

      default: "Processing",

    },

  },

  {
    timestamps: true,
  }

);

const Order = mongoose.model(
  "Order",
  orderSchema
);

export default Order;