import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";

function AllBooks() {

  const [books, setBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {

    fetchBooks();

    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);

  }, []);

  // FETCH BOOKS

  const fetchBooks = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/books`
      );

      setBooks(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // WISHLIST

  const toggleWishlist = (book) => {

    const token = localStorage.getItem("token");

    if (!token) {

      toast.error("Please login first");

      return;

    }

    let updatedWishlist = [...wishlist];

    const exists = updatedWishlist.find(
      (item) => item._id === book._id
    );

    if (exists) {

      updatedWishlist = updatedWishlist.filter(
        (item) => item._id !== book._id
      );

      toast.success("Removed from wishlist");

    } else {

      updatedWishlist.push(book);

      toast.success("Added to wishlist");

    }

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

  };

  // ADD TO CART

  const addToCart = (book) => {

    const token = localStorage.getItem("token");

    if (!token) {

      toast.error("Please login first");

      return;

    }

    let cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(
      (item) => item._id === book._id
    );

    if (!exists) {

      cart.push(book);

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );

      toast.success("Book added to cart");

    } else {

      toast.error("Book already in cart");

    }

  };

  return (

    <div className="bg-[#f5f7fb] min-h-screen pt-3 pb-14 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>

            <p className="uppercase tracking-[4px] text-yellow-500 text-xs font-semibold mb-2">

              Complete Collection

            </p>

            <h1 className="text-3xl md:text-5xl font-bold text-[#04152d] leading-tight">

              Explore All Books

            </h1>

            <p className="text-gray-600 text-sm md:text-lg mt-3 max-w-2xl">

              Discover trending books, timeless classics,
              and premium reading experiences only on BOOKNEST.

            </p>

          </div>

          <div className="bg-white border border-gray-200 px-5 py-4 rounded-2xl shadow-sm w-fit">

            <p className="text-[#04152d] font-bold text-lg">

              {books.length} Books Available

            </p>

          </div>

        </div>

        {/* EMPTY STATE */}

        {books.length === 0 ? (

          <div className="flex flex-col items-center justify-center text-center py-28">

            <h2 className="text-4xl font-bold text-[#04152d] mb-4">

              No Books Found

            </h2>

            <p className="text-gray-500 text-lg">

              Books will appear here once added.

            </p>

          </div>

        ) : (

          /* BOOK GRID */

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

            {books.map((book) => {

              const isWishlisted = wishlist.find(
                (item) => item._id === book._id
              );

              return (

                <div
                  key={book._id}
                  className="bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group max-w-[240px] mx-auto w-full"
                >

                  {/* IMAGE */}

                  <Link to={`/book/${book._id}`}>

                    <div className="relative overflow-hidden bg-gray-100 h-[190px]">

                      <img
                        src={book.image}
                        alt={book.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.unsplash.com/photo-1544947950-fa07a98d237f";
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />

                      {/* WISHLIST */}

                      <button
                        onClick={(e) => {

                          e.preventDefault();

                          toggleWishlist(book);

                        }}
                        className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition duration-300 ${
                          isWishlisted
                            ? "bg-pink-500 text-white"
                            : "bg-white text-gray-700"
                        }`}
                      >

                        <Heart
                          size={15}
                          fill={
                            isWishlisted
                              ? "currentColor"
                              : "none"
                          }
                        />

                      </button>

                    </div>

                  </Link>

                  {/* DETAILS */}

                  <div className="p-4">

                    {/* TITLE */}

                    <h2 className="text-[17px] font-bold text-[#04152d] leading-7 line-clamp-2 min-h-[54px]">

                      {book.title}

                    </h2>

                    {/* AUTHOR */}

                    <p className="text-gray-500 text-sm mt-1 mb-2">

                      by {book.author}

                    </p>

                    {/* RATING */}

                    <div className="flex items-center gap-1 text-yellow-500 mb-4">

                      <Star
                        size={13}
                        fill="currentColor"
                      />

                      <span className="text-gray-700 text-sm font-medium">

                        4.9

                      </span>

                    </div>

                    {/* PRICE + CART */}

                    <div className="flex items-center justify-between">

                      <h3 className="text-[20px] font-extrabold text-[#04152d]">

                        ₹{book.price}

                      </h3>

                      <button
                        onClick={() => addToCart(book)}
                        className="bg-[#04152d] hover:bg-black text-white p-2.5 rounded-2xl transition duration-300 shadow-md"
                      >

                        <ShoppingCart size={16} />

                      </button>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>

  );

}

export default AllBooks;