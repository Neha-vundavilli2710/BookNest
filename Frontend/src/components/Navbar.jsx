import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import axios from "axios";

import {
  CirclePlus,
  Heart,
  ShoppingCart,
  LogOut,
  Search,
  PackageCheck,
  LayoutDashboard,
  ClipboardList,
  UserCog,
  Menu,
  X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Navbar() {

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  // MOBILE MENU

  const [mobileMenu, setMobileMenu] =
    useState(false);

  // SEARCH STATES

  const [search, setSearch] =
    useState("");

  const [searchResults, setSearchResults] =
    useState([]);

  const [showResults, setShowResults] =
    useState(false);

  // CART ITEMS

  const cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  // SEARCH BOOKS

  const handleSearch = async (value) => {

    setSearch(value);

    if (value.trim() === "") {

      setSearchResults([]);

      setShowResults(false);

      return;

    }

    try {

      const res = await axios.get(

        `${import.meta.env.VITE_API_URL}/api/books/search?q=${value}`

      );

      setSearchResults(res.data);

      setShowResults(true);

    } catch (error) {

      console.log(error);

    }

  };

  // LOGOUT

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (

    <nav className="bg-[#04152d] sticky top-0 z-50 shadow-lg border-b border-white/10">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between h-20 gap-4">

          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center gap-2 no-underline shrink-0"
          >

            <span className="text-3xl sm:text-4xl">

              📖

            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-none">

              BOOK
              <span className="text-yellow-400">

                NEST

              </span>

            </h1>

          </Link>

          {/* SEARCH BAR */}

          <div className="hidden md:block relative flex-1 max-w-xl">

            {/* INPUT */}

            <div className="flex items-center bg-white rounded-2xl overflow-hidden shadow-md">

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  handleSearch(e.target.value)
                }
                placeholder="Search for books, authors..."
                className="w-full px-5 py-3 outline-none text-gray-700"
              />

              <button className="px-4 text-gray-700 hover:text-black transition">

                <Search size={22} />

              </button>

            </div>

            {/* SEARCH RESULTS */}

            {showResults && (

              <div className="absolute top-16 left-0 w-full bg-white rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[400px] overflow-y-auto">

                {searchResults.length > 0 ? (

                  searchResults.map((book) => (

                    <div
                      key={book._id}
                      onClick={() => {

                        navigate(`/book/${book._id}`);

                        setShowResults(false);

                        setSearch("");

                      }}
                      className="flex items-center gap-4 p-4 hover:bg-gray-100 cursor-pointer transition"
                    >

                      {/* IMAGE */}

                      <img
                        src={book.image}
                        alt={book.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.unsplash.com/photo-1544947950-fa07a98d237f";
                        }}
                        className="w-14 h-16 object-cover rounded-lg"
                      />

                      {/* DETAILS */}

                      <div>

                        <h3 className="font-semibold text-[#04152d]">

                          {book.title}

                        </h3>

                        <p className="text-sm text-gray-500">

                          {book.author}

                        </p>

                      </div>

                    </div>

                  ))

                ) : (

                  <div className="p-5 text-center text-gray-500">

                    No books found

                  </div>

                )}

              </div>

            )}

          </div>

          {/* DESKTOP RIGHT SECTION */}

          <div className="hidden lg:flex items-center gap-3">

            {!user ? (

              <>

                {/* LOGIN */}

                <Link
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-2xl no-underline transition duration-300 font-semibold"
                >

                  Login

                </Link>

                {/* SIGNUP */}

                <Link
                  to="/signup"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-2xl no-underline transition duration-300 font-semibold"
                >

                  Signup

                </Link>

              </>

            ) : (

              <>

                {/* USER ROUTES */}

                {[
                  {
                    to: "/wishlist",
                    icon: <Heart size={19} />,
                    hover: "hover:bg-pink-500",
                  },

                  ...(!user.isAdmin
                    ? [
                        {
                          to: "/myorders",
                          icon: <PackageCheck size={19} />,
                          hover: "hover:bg-blue-500",
                        },
                      ]
                    : []),
                ].map((item, index) => (

                  <Link
                    key={index}
                    to={item.to}
                    className={`w-11 h-11 flex items-center justify-center rounded-full bg-white/10 ${item.hover} text-white transition duration-300 backdrop-blur-md`}
                  >

                    {item.icon}

                  </Link>

                ))}

                {/* ADMIN ROUTES */}

                {user.isAdmin && (

                  <>

                    {[
                      {
                        to: "/addbook",
                        icon: <CirclePlus size={19} />,
                        hover: "hover:bg-green-500",
                      },
                      {
                        to: "/admin",
                        icon: <LayoutDashboard size={19} />,
                        hover: "hover:bg-purple-500",
                      },
                      {
                        to: "/admin/orders",
                        icon: <ClipboardList size={19} />,
                        hover: "hover:bg-orange-500",
                      },
                      {
                        to: "/admin/users",
                        icon: <UserCog size={19} />,
                        hover: "hover:bg-cyan-500",
                      },
                    ].map((item, index) => (

                      <Link
                        key={index}
                        to={item.to}
                        className={`w-11 h-11 flex items-center justify-center rounded-full bg-white/10 ${item.hover} text-white transition duration-300 backdrop-blur-md`}
                      >

                        {item.icon}

                      </Link>

                    ))}

                  </>

                )}

                {/* CART */}

                <Link
                  to="/cart"
                  className="relative w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black text-white transition duration-300 backdrop-blur-md"
                >

                  <ShoppingCart size={19} />

                  {cart.length > 0 && (

                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">

                      {cart.length}

                    </span>

                  )}

                </Link>

                {/* LOGOUT */}

                <button
                  onClick={handleLogout}
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-500 text-white transition duration-300 backdrop-blur-md border-0 outline-none"
                >

                  <LogOut size={19} />

                </button>

              </>

            )}

          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="lg:hidden text-white"
          >

            {mobileMenu ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}

          </button>

        </div>

        {/* MOBILE SEARCH */}

        <div className="md:hidden pb-4">

          <div className="flex items-center bg-white rounded-2xl overflow-hidden shadow-md">

            <input
              type="text"
              value={search}
              onChange={(e) =>
                handleSearch(e.target.value)
              }
              placeholder="Search books..."
              className="w-full px-4 py-3 outline-none text-gray-700"
            />

            <button className="px-4 text-gray-700">

              <Search size={20} />

            </button>

          </div>

        </div>

        {/* MOBILE MENU */}

        {mobileMenu && (

          <div className="lg:hidden pb-5">

            <div className="bg-white rounded-2xl p-4 shadow-xl flex flex-col gap-3">

              {!user ? (

                <>

                  <Link
                    to="/login"
                    className="bg-blue-500 text-white py-3 rounded-xl text-center font-semibold"
                  >

                    Login

                  </Link>

                  <Link
                    to="/signup"
                    className="bg-yellow-400 text-black py-3 rounded-xl text-center font-semibold"
                  >

                    Signup

                  </Link>

                </>

              ) : (

                <>

                  <Link
                    to="/wishlist"
                    className="bg-gray-100 hover:bg-gray-200 text-[#04152d] py-3 px-4 rounded-xl font-medium transition"
                  >

                    Wishlist

                  </Link>

                  {!user.isAdmin && (

                    <Link
                      to="/myorders"
                      className="bg-gray-100 hover:bg-gray-200 text-[#04152d] py-3 px-4 rounded-xl font-medium transition"
                    >

                      My Orders

                    </Link>

                  )}

                  <Link
                    to="/cart"
                    className="bg-gray-100 hover:bg-gray-200 text-[#04152d] py-3 px-4 rounded-xl font-medium transition"
                  >

                    Cart

                  </Link>

                  {/* ADMIN LINKS */}

                  {user.isAdmin && (

                    <>

                      <Link
                        to="/addbook"
                        className="bg-gray-100 hover:bg-gray-200 text-[#04152d] py-3 px-4 rounded-xl font-medium transition"
                      >

                        Add Book

                      </Link>

                      <Link
                        to="/admin"
                        className="bg-gray-100 hover:bg-gray-200 text-[#04152d] py-3 px-4 rounded-xl font-medium transition"
                      >

                        Dashboard

                      </Link>

                      <Link
                        to="/admin/orders"
                        className="bg-gray-100 hover:bg-gray-200 text-[#04152d] py-3 px-4 rounded-xl font-medium transition"
                      >

                        Orders

                      </Link>

                      <Link
                        to="/admin/users"
                        className="bg-gray-100 hover:bg-gray-200 text-[#04152d] py-3 px-4 rounded-xl font-medium transition"
                      >

                        Users

                      </Link>

                    </>

                  )}

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
                  >

                    Logout

                  </button>

                </>

              )}

            </div>

          </div>

        )}

      </div>

    </nav>

  );

}

export default Navbar;