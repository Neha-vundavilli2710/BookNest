import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  BookOpen,
  User,
  IndianRupee,
  Image,
  FileText,
  Plus,
  Upload,
} from "lucide-react";

function AddBook() {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const token = localStorage.getItem("token");

      await axios.post(

        `${import.meta.env.VITE_API_URL}/api/books`,

        formData,

        {
          headers: {
            Authorization: token,
          },
        }

      );

      toast.success("Book Added Successfully");

      setFormData({
        title: "",
        author: "",
        category: "",
        price: "",
        image: "",
        description: "",
      });

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to add book"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="bg-[#f5f7fb] min-h-screen px-4 py-4">

      <div className="max-w-5xl mx-auto bg-white rounded-[28px] overflow-hidden shadow-xl border border-gray-200">

        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* LEFT SIDE */}

          <div className="bg-[#04152d] text-white p-8 lg:p-10 relative overflow-hidden flex flex-col justify-between">

            {/* BACKGROUND CIRCLES */}

            <div className="absolute top-[-100px] left-[-100px] w-60 h-60 bg-yellow-400/10 rounded-full"></div>

            <div className="absolute bottom-[-120px] right-[-100px] w-72 h-72 bg-blue-500/10 rounded-full"></div>

            <div className="relative z-10">

              {/* LOGO */}

              <div className="flex items-center gap-3 mb-10">

                <div className="bg-yellow-400/10 p-3 rounded-2xl">

                  <BookOpen
                    size={32}
                    className="text-yellow-400"
                  />

                </div>

                <h1 className="text-4xl font-extrabold tracking-wide">
                  BookNest
                </h1>

              </div>

              {/* TITLE */}

              <h2 className="text-5xl font-extrabold leading-tight mb-6">

                Add New
                <br />

                <span className="text-yellow-400">
                  Book 📚
                </span>

              </h2>

              {/* DESCRIPTION */}

              <p className="text-gray-300 text-lg leading-9 max-w-md">

                Upload premium books to your digital bookstore and
                create a modern reading experience for your users.

              </p>

              {/* FEATURE CARDS */}

              <div className="mt-10 space-y-4">

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">

                  <h3 className="font-semibold text-lg mb-1">
                    Premium Library
                  </h3>

                  <p className="text-gray-400 text-sm">
                    Manage trending books with modern collections.
                  </p>

                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">

                  <h3 className="font-semibold text-lg mb-1">
                    Easy Upload
                  </h3>

                  <p className="text-gray-400 text-sm">
                    Add books quickly with clean structured forms.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="p-6 lg:p-8 bg-white">

            <div className="mb-6">

              <h2 className="text-5xl font-extrabold text-[#04152d] mb-2">
                Add Book
              </h2>

              <p className="text-gray-500 text-lg">
                Fill the details below to upload a new book
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* BOOK TITLE */}

              <div>

                <label className="font-semibold text-gray-700 mb-2 block text-sm">
                  Book Title
                </label>

                <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 bg-gray-50 focus-within:border-yellow-400 transition">

                  <BookOpen
                    className="text-gray-400 mr-3"
                    size={18}
                  />

                  <input
                    type="text"
                    name="title"
                    placeholder="Enter book title"
                    className="w-full bg-transparent outline-none text-sm"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* AUTHOR */}

              <div>

                <label className="font-semibold text-gray-700 mb-2 block text-sm">
                  Author
                </label>

                <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 bg-gray-50 focus-within:border-yellow-400 transition">

                  <User
                    className="text-gray-400 mr-3"
                    size={18}
                  />

                  <input
                    type="text"
                    name="author"
                    placeholder="Enter author name"
                    className="w-full bg-transparent outline-none text-sm"
                    value={formData.author}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* CATEGORY */}

              <div>

                <label className="font-semibold text-gray-700 mb-2 block text-sm">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 bg-gray-50 outline-none text-sm focus:border-yellow-400 transition"
                  required
                >

                  <option value="">
                    Select category
                  </option>

                  <option value="Fiction">
                    Fiction
                  </option>

                  <option value="Romance">
                    Romance
                  </option>

                  <option value="Technology">
                    Technology
                  </option>

                  <option value="Self Help">
                    Self Help
                  </option>

                  <option value="Business">
                    Business
                  </option>

                </select>

              </div>

              {/* PRICE */}

              <div>

                <label className="font-semibold text-gray-700 mb-2 block text-sm">
                  Price
                </label>

                <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 bg-gray-50 focus-within:border-yellow-400 transition">

                  <IndianRupee
                    className="text-gray-400 mr-3"
                    size={18}
                  />

                  <input
                    type="number"
                    name="price"
                    placeholder="Enter price"
                    className="w-full bg-transparent outline-none text-sm"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* IMAGE URL */}

              <div>

                <label className="font-semibold text-gray-700 mb-2 block text-sm">
                  Image URL
                </label>

                <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 bg-gray-50 focus-within:border-yellow-400 transition">

                  <Image
                    className="text-gray-400 mr-3"
                    size={18}
                  />

                  <input
                    type="text"
                    name="image"
                    placeholder="Paste image URL"
                    className="w-full bg-transparent outline-none text-sm"
                    value={formData.image}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* IMAGE PREVIEW */}

              {formData.image && (

                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">

                  <img
                    src={formData.image}
                    alt="preview"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.unsplash.com/photo-1544947950-fa07a98d237f";
                    }}
                    className="w-full h-52 object-cover"
                  />

                </div>

              )}

              {/* DESCRIPTION */}

              <div>

                <label className="font-semibold text-gray-700 mb-2 block text-sm">
                  Description
                </label>

                <div className="flex border border-gray-300 rounded-2xl px-4 py-3 bg-gray-50 focus-within:border-yellow-400 transition">

                  <FileText
                    className="text-gray-400 mr-3 mt-1"
                    size={18}
                  />

                  <textarea
                    name="description"
                    rows="4"
                    placeholder="Enter detailed book description"
                    className="w-full bg-transparent outline-none resize-none text-sm"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>

                </div>

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-2xl text-base transition duration-300 flex items-center justify-center gap-3 shadow-lg disabled:opacity-70"
              >

                {loading ? (
                  "Adding Book..."
                ) : (
                  <>
                    <Plus size={18} />
                    Add Book
                  </>
                )}

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  );
}

export default AddBook;