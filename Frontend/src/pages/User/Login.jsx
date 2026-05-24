import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  Mail,
  Lock,
  BookOpen,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const location = useLocation();

  const { login } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] = useState({

    email: "",

    password: "",

  });

  // SHOW REDIRECT MESSAGE

  useEffect(() => {

    if (location.state?.message) {

      toast.error(
        location.state.message
      );

    }

  }, [location]);

  // CHECK AUTH PAGE

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  // HANDLE LOGIN

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post(

        `${import.meta.env.VITE_API_URL}/api/users/login`,

        formData

      );

      // SAVE TOKEN

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // SAVE USER GLOBALLY

      login(res.data.user);

      toast.success(res.data.message);

      navigate("/");

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Login Failed"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-[calc(100vh-80px)] bg-[#04152d] flex items-center justify-center px-4 py-4 overflow-hidden">

      {/* MAIN CARD */}

      <div className="max-w-4xl w-full bg-white rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.35)] grid grid-cols-1 lg:grid-cols-2 transition-all duration-300 hover:shadow-[0_25px_70px_rgba(0,0,0,0.4)]">

        {/* LEFT SIDE */}

        <div className="bg-gradient-to-br from-[#04152d] via-[#08254a] to-[#0b3566] p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden">

          {/* DECORATIVE SHAPES */}

          <div className="absolute w-56 h-56 bg-yellow-400/10 rounded-full -top-16 -left-16"></div>

          <div className="absolute w-72 h-72 bg-blue-500/10 rounded-full -bottom-28 -right-16"></div>

          {/* CONTENT */}

          <div className="relative z-10">

            {/* LOGO */}

            <div className="flex items-center gap-3 mb-8">

              <BookOpen
                size={34}
                className="text-yellow-400"
              />

              <h1 className="text-3xl lg:text-4xl font-extrabold">

                <span className="text-white">

                  BOOK

                </span>

                <span className="text-yellow-400">

                  NEST

                </span>

              </h1>

            </div>

            {/* HEADING */}

            <h2 className="text-4xl lg:text-[52px] font-extrabold text-white leading-tight mb-5">

              Welcome
              <br />

              Back 👋

            </h2>

            {/* DESCRIPTION */}

            <p className="text-gray-300 text-base leading-relaxed max-w-md">

              Login to continue exploring premium books,
              manage your wishlist, cart, and enjoy a modern
              bookstore experience designed for passionate readers.

            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="p-8 lg:p-10 flex flex-col justify-center bg-white">

          {/* TOP */}

          <div className="mb-7">

            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#04152d] mb-2">

              User Login

            </h2>

            <p className="text-gray-500 text-sm lg:text-base">

              Enter your credentials to access your account

            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}

            <div>

              <label className="block text-[#04152d] font-semibold mb-2">

                Email Address

              </label>

              <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-yellow-400 focus-within:border-yellow-400 transition-all duration-300 bg-gray-50">

                <Mail className="text-gray-400 mr-3" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full outline-none bg-transparent text-gray-700"
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div>

              <label className="block text-[#04152d] font-semibold mb-2">

                Password

              </label>

              <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-yellow-400 focus-within:border-yellow-400 transition-all duration-300 bg-gray-50">

                <Lock className="text-gray-400 mr-3" />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full outline-none bg-transparent text-gray-700"
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 hover:scale-[1.01] text-black py-3.5 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg mt-2 disabled:opacity-70"
            >

              {loading ? (
                "Logging in..."
              ) : (
                <>
                  Login
                  <ArrowRight size={22} />
                </>
              )}

            </button>

          </form>

          {/* BOTTOM */}

          <p className="text-gray-500 text-center mt-6 text-sm lg:text-base">

            Don’t have an account?

            <Link
              to="/signup"
              className="text-yellow-500 font-bold ml-2 no-underline hover:underline"
            >

              Signup

            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;