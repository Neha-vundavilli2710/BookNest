import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, "Book title is required"],
    trim: true,
    minlength: [2, "Title must be at least 2 characters"],
    maxlength: [120, "Title cannot exceed 120 characters"],
  },

  author: {
    type: String,
    required: [true, "Author name is required"],
    trim: true,
    minlength: [2, "Author name must be at least 2 characters"],
    maxlength: [80, "Author name cannot exceed 80 characters"],
  },

  price: {
    type: Number,
    required: [true, "Book price is required"],
    min: [1, "Price must be greater than 0"],
  },

  image: {
    type: String,
    required: [true, "Book image is required"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "Book description is required"],
    trim: true,
    minlength: [10, "Description must be at least 10 characters"],
    maxlength: [1000, "Description cannot exceed 1000 characters"],
  },

},
{
  timestamps: true,
});

const Book = mongoose.model(
  "Book",
  bookSchema
);

export default Book;