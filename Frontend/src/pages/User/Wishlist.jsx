import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import {
  Heart,
  ShoppingCart,
  Trash2,
} from "lucide-react";

function Wishlist() {

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {

    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);

  }, []);

  // REMOVE BOOK

  const removeFromWishlist = (id) => {

    const updatedWishlist = wishlist.filter(
      (item) => item._id !== id
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  // ADD TO CART

  const addToCart = (book) => {

    let cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const alreadyExists = cart.find(
      (item) => item._id === book._id
    );

    if (alreadyExists) {

      toast.error("Book already in cart");

      return;
    }

    cart.push(book);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    toast.success("Book added to cart");
  };

  return (

    <div className="bg-[#f5f7fb] min-h-screen pb-14">

      {/* TITLE */}

      <div className="flex justify-center pt-10 pb-10">

        <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-6 py-2 rounded-full font-semibold text-base shadow-sm">

          <Heart
            size={18}
            fill="currentColor"
          />

          My Wishlist

        </div>

      </div>

      {/* EMPTY WISHLIST */}

      {wishlist.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-24">

          <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mb-5">

            <Heart
              size={48}
              className="text-pink-500"
            />

          </div>

          <h2 className="text-4xl font-bold text-[#04152d] mb-3">

            Wishlist is Empty

          </h2>

          <p className="text-gray-500 mb-8 text-center">

            Save your favorite books and access them anytime.

          </p>

          <Link
            to="/"
            className="bg-[#04152d] hover:bg-black text-white px-7 py-3 rounded-full no-underline font-semibold transition duration-300"
          >

            Explore Books

          </Link>

        </div>

      ) : (

        // BOOK GRID

        <div className="max-w-7xl mx-auto px-8">

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

            {wishlist.map((book) => (

              <div
                key={book._id}
                className="bg-white rounded-[22px] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition duration-300 group"
              >

                {/* IMAGE */}

                <Link to={`/book/${book._id}`}>

                  <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">

                    <img
                      src={
                        book.image ||
                        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1200&auto=format&fit=crop"
                      }
                      alt={book.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1200&auto=format&fit=crop";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    {/* REMOVE BUTTON */}

                    <button
                      onClick={(e) => {

                        e.preventDefault();

                        removeFromWishlist(book._id);

                      }}
                      className="absolute top-3 right-3 bg-white text-red-500 p-2 rounded-xl shadow-md hover:bg-red-500 hover:text-white transition duration-300"
                    >

                      <Trash2 size={16} />

                    </button>

                  </div>

                </Link>

                {/* DETAILS */}

                <div className="p-4">

                  {/* TITLE */}

                  <h2 className="text-lg font-bold text-[#04152d] leading-6 line-clamp-2 min-h-[48px]">

                    {book.title}

                  </h2>

                  {/* AUTHOR */}

                  <p className="text-gray-500 text-sm mt-1 mb-3">

                    by {book.author}

                  </p>

                  {/* PRICE + CART */}

                  <div className="flex items-center justify-between">

                    <p className="text-2xl font-extrabold text-[#04152d]">

                      ₹{book.price}

                    </p>

                    <button
                      onClick={() => addToCart(book)}
                      className="bg-[#04152d] text-white p-3 rounded-xl hover:bg-black transition duration-300"
                    >

                      <ShoppingCart size={18} />

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
}

export default Wishlist;