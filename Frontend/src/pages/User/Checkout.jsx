import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

function Checkout() {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [formData, setFormData] = useState({

    name: "",

    email:
      JSON.parse(
        localStorage.getItem("user")
      )?.email || "",

    address: "",

    phone: "",

  });

  useEffect(() => {

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(cart);

  }, []);

  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  // TOTAL PRICE

  const totalPrice = cartItems.reduce(

    (total, item) =>
      total +
      item.price *
      (item.quantity || 1),

    0

  );

  // PLACE ORDER

  const handlePlaceOrder = async () => {

    if (

      !formData.name ||

      !formData.email ||

      !formData.address ||

      !formData.phone

    ) {

      toast.error("Please fill all details");

      return;

    }

    try {

      const token =
        localStorage.getItem("token");

      const orderData = {

        user: JSON.parse(
          localStorage.getItem("user")
        )?.email,

        items: cartItems,

        totalPrice,

        status: "Processing",

        shippingInfo: {

          name: formData.name,

          email: JSON.parse(
            localStorage.getItem("user")
          )?.email,

          address: formData.address,

          phone: formData.phone,

        },

      };

      const res = await axios.post(

        `${import.meta.env.VITE_API_URL}/api/orders`,

        orderData,

        {
          headers: {
            Authorization: token,
          },
        }

      );

      toast.success(res.data.message);

      // CLEAR CART

      localStorage.removeItem("cart");

      navigate("/");

    } catch (error) {

      toast.error("Failed to place order");

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-[#f5f7fb] px-4 py-6">

      <div className="max-w-5xl mx-auto">

        {/* TITLE */}

        <div className="text-center mb-6">

          <h1 className="text-3xl font-bold text-[#081028]">

            Checkout

          </h1>

          <p className="text-gray-500 text-sm mt-1">

            Complete your order securely

          </p>

        </div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-5 items-start">

          {/* BILLING DETAILS */}

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

            {/* HEADER */}

            <div className="bg-[#081028] px-6 py-5">

              <h2 className="text-2xl font-bold text-white">

                Billing Details

              </h2>

              <p className="text-gray-300 text-sm mt-1">

                Enter your shipping information

              </p>

            </div>

            {/* FORM */}

            <div className="p-6 space-y-4">

              {/* FULL NAME */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">

                  Full Name

                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#081028]"
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">

                  Email Address

                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#081028]"
                />

              </div>

              {/* PHONE */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">

                  Phone Number

                </label>

                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#081028]"
                />

              </div>

              {/* ADDRESS */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">

                  Delivery Address

                </label>

                <textarea
                  name="address"
                  rows="3"
                  placeholder="Enter delivery address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-[#081028]"
                ></textarea>

              </div>

            </div>

          </div>

          {/* ORDER SUMMARY */}

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-fit">

            {/* HEADER */}

            <div className="bg-[#081028] px-6 py-5">

              <h2 className="text-2xl font-bold text-white">

                Order Summary

              </h2>

              <p className="text-gray-300 text-sm mt-1">

                Review your selected books

              </p>

            </div>

            {/* CONTENT */}

            <div className="p-5">

              {/* PRODUCTS */}

              <div className="space-y-4">

                {cartItems.map((item) => (

                  <div
                    key={item._id}
                    className="flex items-center gap-3"
                  >

                    {/* IMAGE */}

                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">

                      <img
                        src={item.image}
                        alt={item.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.unsplash.com/photo-1544947950-fa07a98d237f";
                        }}
                        className="w-full h-full object-cover"
                      />

                    </div>

                    {/* DETAILS */}

                    <div className="flex-1 min-w-0">

                      <h3 className="font-semibold text-[#081028] text-base truncate">

                        {item.title}

                      </h3>

                      <p className="text-gray-500 text-sm">

                        {item.author}

                      </p>

                    </div>

                    {/* PRICE */}

                    <p className="text-green-600 font-bold text-lg">

                      ₹
                      {item.price *
                        (item.quantity || 1)}

                    </p>

                  </div>

                ))}

              </div>

              {/* TOTAL */}

              <div className="border-t mt-5 pt-5">

                <div className="flex justify-between items-center mb-5">

                  <span className="text-lg font-bold text-[#081028]">

                    Total

                  </span>

                  <span className="text-3xl font-bold text-green-600">

                    ₹{totalPrice}

                  </span>

                </div>

                {/* PLACE ORDER BUTTON */}

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-[#081028] py-3 rounded-xl font-bold transition duration-300"
                >

                  Place Order

                </button>

                <p className="text-center text-gray-400 text-xs mt-3">

                  Safe & Secure Payments

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Checkout;