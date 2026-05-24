import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";

import axios from "axios";

import toast from "react-hot-toast";

import {
  Pencil,
  Trash2,
  BookOpen,
} from "lucide-react";

function BookDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [book, setBook] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    fetchBook();

  }, []);

  // FETCH BOOK

  const fetchBook = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/books/${id}`
      );

      setBook(res.data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to fetch book");

    }
  };

  // DELETE BOOK

  const handleDelete = async () => {

    const token = localStorage.getItem("token");

    // CHECK LOGIN

    if (!token) {

      navigate("/login");

      return;

    }

    try {

      setLoading(true);

      const res = await axios.delete(

        `${import.meta.env.VITE_API_URL}/api/books/${id}`,

        {
          headers: {
            Authorization: token,
          },
        }

      );

      toast.success(res.data.message);

      navigate("/");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete book"
      );

    } finally {

      setLoading(false);

    }
  };

  // LOADING

  if (!book) {

    return (

      <div className="min-h-screen flex justify-center items-center bg-[#f5f7fb]">

        <h2 className="text-2xl font-bold text-gray-700">

          Loading...

        </h2>

      </div>

    );
  }

  return (

    <div className="min-h-screen bg-[#f5f7fb] px-4 py-10">

      <div className="max-w-5xl mx-auto">

        {/* MAIN CARD */}

        <div className="bg-white rounded-[28px] shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr]">

          {/* LEFT IMAGE SECTION */}

          <div className="flex items-center justify-center p-4 bg-gradient-to-br from-[#f8fafc] to-[#eef2ff] border-r border-gray-100">

            <img
              src={
                book.image ||
                "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
              }
              alt={book.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://images.unsplash.com/photo-1544947950-fa07a98d237f";
              }}
              className="w-[230px] h-[340px] object-cover rounded-[22px] shadow-xl"
            />

          </div>

          {/* RIGHT CONTENT */}

          <div className="p-8 flex flex-col justify-center">

            {/* BADGE */}

            <div className="mb-5">

              <span className="inline-flex items-center gap-2 bg-[#001233] text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">

                <BookOpen size={16} />

                Book Details

              </span>

            </div>

            {/* TITLE */}

            <h1 className="text-4xl font-bold text-[#081028] leading-tight mb-3">

              {book.title}

            </h1>

            {/* AUTHOR */}

            <p className="text-lg text-gray-500 mb-5">

              by{" "}

              <span className="font-semibold text-[#081028]">

                {book.author}

              </span>

            </p>

            {/* PRICE */}

            <h2 className="text-4xl font-bold text-green-600 mb-6">

              ₹{book.price}

            </h2>

            {/* DESCRIPTION */}

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 min-h-[90px] max-w-[520px] mb-8">

              <h3 className="text-lg font-semibold text-[#081028] mb-2">

                Description

              </h3>

              <p className="text-gray-600 leading-relaxed text-[15px]">

                {book.description}

              </p>

            </div>

            {/* BUTTONS */}

            <div className="flex flex-wrap gap-4">

              {/* EDIT BUTTON */}

              <Link to={`/editbook/${book._id}`}>

                <button className="flex items-center gap-2 bg-[#001233] hover:bg-[#000814] text-white px-5 py-2.5 rounded-2xl font-semibold transition duration-300 shadow-md">

                  <Pencil size={18} />

                  Edit Book

                </button>

              </Link>

              {/* DELETE BUTTON */}

              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-2xl font-semibold transition duration-300 shadow-md disabled:opacity-70"
              >

                <Trash2 size={18} />

                {loading
                  ? "Deleting..."
                  : "Delete Book"}

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BookDetails;