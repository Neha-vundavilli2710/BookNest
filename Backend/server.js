import express from "express";

import mongoose from "mongoose";

import cors from "cors";

import dotenv from "dotenv";

import bookRoutes from "./routes/bookRoutes.js";

import userRoutes from "./routes/userRoutes.js";

import orderRoutes from "./routes/orderRoutes.js";

import adminRoutes from "./routes/adminRoutes.js";

// MIDDLEWARES

import authMiddleware from "./middleware/authMiddleware.js";

import adminMiddleware from "./middleware/adminMiddleware.js";

dotenv.config();

const app = express();

// MIDDLEWARES

app.use(cors());

app.use(express.json());

// DATABASE CONNECTION

mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log("MongoDB Connected");

})

.catch((error) => {

  console.log(error);

});

// ROUTES

// PUBLIC ROUTES

app.use("/api/books", bookRoutes);

app.use("/api/users", userRoutes);

// PROTECTED ORDER ROUTES

app.use(
  "/api/orders",
  authMiddleware,
  orderRoutes
);

// ADMIN ROUTES

app.use(
  "/api/admin",
  authMiddleware,
  adminMiddleware,
  adminRoutes
);

// SERVER

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});