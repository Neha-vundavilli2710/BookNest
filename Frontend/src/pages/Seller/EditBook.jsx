import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import toast from "react-hot-toast";

function EditBook() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    image: "",
    description: "",
  });

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

      setFormData({
        title: res.data.title,
        author: res.data.author,
        price: res.data.price,
        image: res.data.image,
        description: res.data.description,
      });

    } catch (error) {

      console.log(error);

      toast.error("Failed to fetch book");

    }
  };

  // HANDLE CHANGE

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // UPDATE BOOK

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const token = localStorage.getItem("token");

      await axios.put(

        `${import.meta.env.VITE_API_URL}/api/books/${id}`,

        formData,

        {
          headers: {
            Authorization: token,
          },
        }

      );

      toast.success("Book Updated Successfully!");

      navigate(`/book/${id}`);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update book"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-gray-100 py-6 px-4">

      <div className="max-w-4xl mx-auto">

        {/* MAIN CARD */}

        <div className="bg-white rounded-[25px] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

          {/* LEFT SECTION */}

          <div className="bg-[#001233] p-7 flex flex-col justify-center">

            <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-xs font-semibold w-fit mb-5">

              Edit Collection

            </span>

            <h1 className="text-4xl font-bold text-white leading-tight mb-4">

              Edit Your
              <span className="text-yellow-400">

                {" "}Book

              </span>

            </h1>

            <p className="text-gray-300 text-sm leading-6 mb-6">

              Update your book details and maintain your
              bookstore professionally.

            </p>

            {/* PREVIEW IMAGE */}

            <div className="bg-[#001845] rounded-2xl p-4 flex justify-center">

              <img
                src={
                  formData.image ||
                  "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
                }
                alt="Book Preview"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://images.unsplash.com/photo-1544947950-fa07a98d237f";
                }}
                className="w-[160px] h-[230px] object-cover rounded-xl shadow-lg"
              />

            </div>

          </div>

          {/* RIGHT FORM SECTION */}

          <div className="p-7">

            <h2 className="text-3xl font-bold text-gray-900 mb-1">

              Edit Book

            </h2>

            <p className="text-gray-500 text-sm mb-6">

              Update the details below

            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* TITLE */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">

                  Book Title

                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  required
                />

              </div>

              {/* AUTHOR */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">

                  Author

                </label>

                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter author"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  required
                />

              </div>

              {/* PRICE */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">

                  Price

                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  required
                />

              </div>

              {/* IMAGE URL */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">

                  Image URL

                </label>

                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  required
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">

                  Description

                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter description"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none text-sm"
                  required
                ></textarea>

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-xl text-base font-bold transition duration-300 shadow-md disabled:opacity-70"
              >

                {loading
                  ? "Updating Book..."
                  : "Update Book"}

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  );

}

export default EditBook;