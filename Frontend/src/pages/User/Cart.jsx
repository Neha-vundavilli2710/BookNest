import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Trash2,
  ShoppingBag,
  ShieldCheck,
  Plus,
  Minus,
} from "lucide-react";

function Cart() {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(cart);

  }, []);

  // REMOVE ITEM

  const handleRemove = (id) => {

    const updatedCart = cartItems.filter(
      (item) => item._id !== id
    );

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };

  // INCREASE QUANTITY

  const increaseQty = (id) => {

    const updated = cartItems.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity: (item.quantity || 1) + 1,
          }
        : item
    );

    setCartItems(updated);

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );

  };

  // DECREASE QUANTITY

  const decreaseQty = (id) => {

    const updated = cartItems.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity:
              (item.quantity || 1) > 1
                ? item.quantity - 1
                : 1,
          }
        : item
    );

    setCartItems(updated);

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );

  };

  // TOTAL PRICE

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      item.price * (item.quantity || 1),
    0
  );

  return (

    <div className="min-h-screen bg-[#f5f7fb] py-8 px-4">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="flex items-center gap-3 mb-8">

          <div className="bg-[#081028] p-3 rounded-2xl shadow-md">

            <ShoppingBag
              className="text-white"
              size={22}
            />

          </div>

          <div>

            <h1 className="text-4xl font-extrabold text-[#081028]">

              Shopping Cart

            </h1>

            <p className="text-gray-500 text-sm mt-1">

              Review your selected books

            </p>

          </div>

        </div>

        {cartItems.length === 0 ? (

          // EMPTY CART

          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-14 text-center">

            <h2 className="text-2xl font-bold text-gray-700 mb-3">

              Your Cart is Empty

            </h2>

            <p className="text-gray-500">

              Add some books to your cart.

            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_0.7fr] gap-5 items-start">

            {/* LEFT SIDE */}

            <div className="space-y-4">

              {cartItems.map((item) => (

                <div
                  key={item._id}
                  className="bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition p-4"
                >

                  <div className="flex items-center justify-between gap-4">

                    {/* LEFT CONTENT */}

                    <div className="flex items-center gap-4 flex-1 min-w-0">

                      {/* IMAGE */}

                      <div className="w-20 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">

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

                        <h2 className="text-xl font-bold text-[#081028] line-clamp-2">

                          {item.title}

                        </h2>

                        <p className="text-gray-500 text-sm mt-1">

                          by {item.author}

                        </p>

                        <p className="text-green-600 text-2xl font-bold mt-2">

                          ₹
                          {(
                            item.price *
                            (item.quantity || 1)
                          ).toLocaleString()}

                        </p>

                        {/* CONTROLS */}

                        <div className="flex items-center gap-3 mt-4">

                          {/* QUANTITY */}

                          <div className="flex items-center bg-gray-100 rounded-xl p-1">

                            <button
                              onClick={() =>
                                decreaseQty(item._id)
                              }
                              className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center transition"
                            >

                              <Minus size={15} />

                            </button>

                            <span className="w-8 text-center font-semibold text-sm">

                              {item.quantity || 1}

                            </span>

                            <button
                              onClick={() =>
                                increaseQty(item._id)
                              }
                              className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center transition"
                            >

                              <Plus size={15} />

                            </button>

                          </div>

                          {/* DELETE */}

                          <button
                            onClick={() =>
                              handleRemove(item._id)
                            }
                            className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center transition"
                          >

                            <Trash2
                              size={17}
                              className="text-red-500"
                            />

                          </button>

                        </div>

                      </div>

                    </div>

                    {/* RIGHT PRICE */}

                    <div className="hidden md:block">

                      <p className="text-3xl font-bold text-green-600 whitespace-nowrap">

                        ₹
                        {(
                          item.price *
                          (item.quantity || 1)
                        ).toLocaleString()}

                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* RIGHT SIDE */}

            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 sticky top-24">

              <h2 className="text-3xl font-extrabold text-[#081028] mb-6">

                Order Summary

              </h2>

              {/* DETAILS */}

              <div className="space-y-4">

                <div className="flex justify-between text-gray-500">

                  <span>Total Items</span>

                  <span className="font-semibold text-[#081028]">

                    {cartItems.length}

                  </span>

                </div>

                <div className="flex justify-between text-gray-500">

                  <span>Subtotal</span>

                  <span className="font-semibold text-[#081028]">

                    ₹{totalPrice.toLocaleString()}

                  </span>

                </div>

                <div className="flex justify-between text-gray-500">

                  <span>Delivery</span>

                  <span className="text-green-600 font-semibold">

                    Free

                  </span>

                </div>

              </div>

              <hr className="my-5" />

              {/* TOTAL */}

              <div className="flex justify-between items-center mb-6">

                <span className="text-2xl font-bold text-[#081028]">

                  Total

                </span>

                <span className="text-green-600 text-4xl font-extrabold">

                  ₹{totalPrice.toLocaleString()}

                </span>

              </div>

              {/* BUTTON */}

              <button
                onClick={() =>
                  navigate("/checkout")
                }
                className="w-full bg-[#081028] hover:bg-black text-white py-3 rounded-2xl text-lg font-semibold transition"
              >

                Proceed To Checkout

              </button>

              {/* SAFE PAYMENT */}

              <div className="flex items-center justify-center gap-2 mt-4 text-gray-400">

                <ShieldCheck size={16} />

                <p className="text-sm">

                  Safe & Secure Payments

                </p>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default Cart;