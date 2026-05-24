import express from "express";

import Book from "../models/Book.js";

import authMiddleware from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// GET ALL BOOKS

router.get("/", async (req, res) => {

  try {

    const books = await Book.find();

    res.status(200).json(books);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

// SEARCH BOOKS

router.get("/search", async (req, res) => {

  try {

    const query = req.query.q;

    const books = await Book.find({

      $or: [

        {
          title: {
            $regex: query,
            $options: "i",
          },
        },

        {
          author: {
            $regex: query,
            $options: "i",
          },
        },

      ],

    });

    res.status(200).json(books);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

// GET SINGLE BOOK

router.get("/:id", async (req, res) => {

  try {

    const book = await Book.findById(req.params.id);

    res.status(200).json(book);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

// ADD BOOK (ADMIN ONLY)

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      const {
        title,
        author,
        price,
        image,
        description,
      } = req.body;

      const newBook = new Book({
        title,
        author,
        price,
        image,
        description,
      });

      await newBook.save();

      res.status(201).json({
        success: true,
        message: "Book Added Successfully",
        newBook,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  }
);

// UPDATE BOOK (ADMIN ONLY)

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      const updatedBook =
        await Book.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }

        );

      res.status(200).json({
        success: true,
        message: "Book Updated Successfully",
        updatedBook,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  }
);

// DELETE BOOK (ADMIN ONLY)

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      await Book.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message: "Book Deleted Successfully",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  }
);

export default router;