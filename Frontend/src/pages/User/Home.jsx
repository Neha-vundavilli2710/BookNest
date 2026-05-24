import { useEffect, useState } from "react";

import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import heroImage from "../../assets/hero.jpg";

import toast from "react-hot-toast";

import {
  ShoppingCart,
  Heart,
  Star,
  ArrowRight,
} from "lucide-react";

function Home() {

  const navigate = useNavigate();

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

  // ADD TO CART

  const addToCart = (book) => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/login");

      return;

    }

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

  // TOGGLE WISHLIST

  const toggleWishlist = (book) => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/login");

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

  // CHECK WISHLIST

  const isInWishlist = (id) => {

    return wishlist.some(
      (item) => item._id === id
    );

  };

  // FALLBACK IMAGE

  const fallbackImage =
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1200&auto=format&fit=crop";

  return (

    <div className="bg-[#f5f7fb] min-h-screen">

      {/* HERO SECTION */}

      <section className="px-4 pt-4">

        <div className="max-w-7xl mx-auto bg-[#04152d] rounded-[28px] overflow-hidden shadow-xl">

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[420px]">

            {/* LEFT CONTENT */}

            <div className="p-6 sm:p-8 lg:p-12">

              {/* BADGE */}

              <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold mb-5 shadow-md">

                📚 BOOKNEST • Where Stories Nestle

              </div>

              {/* HEADING */}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-5">

                <span className="text-white">

                  Discover Your Next

                </span>

                <br />

                <span className="text-yellow-400">

                  Favorite Story

                </span>

              </h1>

              {/* DESCRIPTION */}

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-7 max-w-xl">

                Explore thousands of books from top authors,
                trending collections, and premium digital reads
                all in one modern bookstore platform.

              </p>

              {/* BUTTON */}

              <button
                onClick={() => {

                  document
                    .getElementById("books-section")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });

                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition duration-300 shadow-lg"
              >

                Explore Books

                <ArrowRight size={18} />

              </button>

            </div>

            {/* RIGHT IMAGE */}

            <div className="relative h-[260px] sm:h-[340px] lg:h-full overflow-hidden">

              <img
                src={heroImage}
                alt="Hero"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#04152d]/20 to-transparent"></div>

            </div>

          </div>

        </div>

      </section>

      {/* POPULAR BOOKS */}

      <section
        id="books-section"
        className="max-w-7xl mx-auto px-4 pt-14 pb-16"
      >

        {/* HEADER */}

        <div className="flex items-center justify-between mb-7">

          <div>

            <p className="text-yellow-500 font-semibold uppercase tracking-[4px] text-xs sm:text-sm mb-2">

              Popular Collection

            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#04152d]">

              Featured Books

            </h2>

          </div>

          <Link to="/books">

            <button className="hidden md:flex items-center gap-2 bg-[#04152d] hover:bg-black text-white px-5 py-2.5 rounded-xl font-medium transition duration-300 shadow-md">

              View All

              <ArrowRight size={16} />

            </button>

          </Link>

        </div>

        {/* BOOK GRID */}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">

          {books.slice(0, 5).map((book) => (

            <div
              key={book._id}
              className="group bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >

              {/* IMAGE */}

              <Link to={`/book/${book._id}`}>

                <div className="relative overflow-hidden bg-gray-100 h-[190px] sm:h-[210px]">

                  {/* WISHLIST */}

                  <button
                    onClick={(e) => {

                      e.preventDefault();

                      toggleWishlist(book);

                    }}
                    className={`absolute top-3 right-3 z-20 p-2 rounded-full shadow-md transition duration-300 ${
                      isInWishlist(book._id)
                        ? "bg-pink-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >

                    <Heart size={15} />

                  </button>

                  <img
                    src={book.image || fallbackImage}
                    alt={book.title}
                    onError={(e) => {

                      e.target.onerror = null;

                      e.target.src = fallbackImage;

                    }}
                    className="w-full h-full object-cover rounded-t-[24px] group-hover:scale-105 transition duration-500"
                  />

                </div>

              </Link>

              {/* CONTENT */}

              <div className="p-4">

                {/* TITLE */}

                <h3 className="text-sm sm:text-base font-bold text-[#04152d] line-clamp-2 min-h-[45px] mb-1">

                  {book.title}

                </h3>

                {/* AUTHOR */}

                <p className="text-gray-500 text-xs sm:text-sm mb-3">

                  by {book.author}

                </p>

                {/* RATING */}

                <div className="flex items-center gap-1 mb-3">

                  <Star
                    size={14}
                    className="text-yellow-400 fill-yellow-400"
                  />

                  <span className="text-xs sm:text-sm text-gray-600">

                    4.9

                  </span>

                </div>

                {/* PRICE + CART */}

                <div className="flex items-center justify-between">

                  <p className="text-xl sm:text-2xl font-extrabold text-[#04152d]">

                    ₹{book.price}

                  </p>

                  <button
                    onClick={() => addToCart(book)}
                    className="bg-[#04152d] hover:bg-black text-white p-2.5 rounded-xl transition duration-300"
                  >

                    <ShoppingCart size={16} />

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-[#04152d] text-white mt-10">

        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* BRAND */}

          <div>

            <h2 className="text-3xl font-extrabold mb-3">

              BOOK<span className="text-yellow-400">NEST</span>

            </h2>

            <p className="text-gray-300 leading-relaxed text-sm">

              Where Stories Nestle. Discover premium books,
              timeless stories, and modern reading experiences
              all in one place.

            </p>

          </div>

          {/* LINKS */}

          <div>

            <h3 className="text-lg font-semibold mb-4">

              Quick Links

            </h3>

            <div className="flex flex-col gap-3 text-gray-300 text-sm">

              <Link
                to="/"
                className="hover:text-yellow-400 transition"
              >

                Home

              </Link>

              <Link
                to="/books"
                className="hover:text-yellow-400 transition"
              >

                All Books

              </Link>

              <Link
                to="/wishlist"
                className="hover:text-yellow-400 transition"
              >

                Wishlist

              </Link>

              <Link
                to="/cart"
                className="hover:text-yellow-400 transition"
              >

                Cart

              </Link>

            </div>

          </div>

          {/* CONTACT */}

          <div>

            <h3 className="text-lg font-semibold mb-4">

              About BOOKNEST

            </h3>

            <p className="text-gray-300 text-sm leading-relaxed">

              BOOKNEST is a modern online bookstore platform
              designed for readers who love discovering stories,
              building collections, and exploring books with a
              premium digital experience.

            </p>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">

          © 2026 BOOKNEST — Where Stories Nestle. All rights reserved.

        </div>

      </footer>

    </div>

  );

}

export default Home;