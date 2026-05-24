import { useEffect, useState } from "react";

import axios from "axios";

import {
  PackageCheck,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

function MyOrders() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    fetchOrders();

  }, []);

  // FETCH ORDERS

  const fetchOrders = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(

        `${import.meta.env.VITE_API_URL}/api/orders/myorders`,

        {
          headers: {
            Authorization: token,
          },
        }

      );

      setOrders(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // LOADING

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb]">

        <h2 className="text-2xl font-bold text-[#081028]">

          Loading Orders...

        </h2>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#f5f7fb] py-8 px-4">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}

        <div className="flex items-center gap-4 mb-8">

          <div className="bg-green-100 p-3 rounded-2xl shadow-sm">

            <PackageCheck
              className="text-green-600"
              size={26}
            />

          </div>

          <div>

            <h1 className="text-4xl font-bold text-[#081028]">

              My Orders

            </h1>

            <p className="text-gray-500 text-sm mt-1">

              View your order history

            </p>

          </div>

        </div>

        {/* EMPTY */}

        {orders.length === 0 ? (

          <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-200">

            <h2 className="text-2xl font-bold text-gray-700 mb-2">

              No Orders Yet

            </h2>

            <p className="text-gray-500">

              Your placed orders will appear here

            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition"
              >

                {/* TOP */}

                <div className="bg-gradient-to-r from-[#081028] to-[#0d1b45] px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  {/* LEFT */}

                  <div>

                    <h2 className="text-lg font-semibold text-white">

                      Order #
                      <span className="text-yellow-400 ml-1">

                        {order._id.slice(-6)}

                      </span>

                    </h2>

                    <p className="text-gray-300 text-sm mt-1">

                      {order.user}

                    </p>

                  </div>

                  {/* RIGHT */}

                  <div className="flex items-center gap-4">

                    <div className="flex items-center gap-2 text-gray-300 text-sm">

                      <CalendarDays size={15} />

                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}

                    </div>

                    <div
                      className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >

                      <CheckCircle2 size={14} />

                      {order.status || "Pending"}

                    </div>

                  </div>

                </div>

                {/* ITEMS */}

                <div className="p-5">

                  <div className="space-y-3">

                    {order.items.map((item, index) => (

                      <div
                        key={index}
                        className="flex items-center gap-4 border border-gray-100 rounded-2xl px-4 py-3 hover:bg-gray-50 transition"
                      >

                        {/* IMAGE */}

                        <div className="w-16 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">

                          <img
                            src={
                              item.image ||
                              "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
                            }
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

                          <h3 className="text-lg font-semibold text-[#081028] truncate">

                            {item.title}

                          </h3>

                          <p className="text-gray-500 text-sm mt-1">

                            by {item.author}

                          </p>

                        </div>

                        {/* PRICE */}

                        <div>

                          <p className="text-xl font-bold text-green-600 whitespace-nowrap">

                            ₹{item.price}

                          </p>

                        </div>

                      </div>

                    ))}

                  </div>

                  {/* TOTAL */}

                  <div className="mt-5 pt-4 border-t border-gray-200 flex items-center justify-between">

                    <h2 className="text-lg font-semibold text-[#081028]">

                      Total Amount

                    </h2>

                    <p className="text-2xl font-bold text-green-600">

                      ₹{order.totalPrice}

                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default MyOrders;