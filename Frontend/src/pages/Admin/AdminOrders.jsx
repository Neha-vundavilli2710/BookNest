import { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  PackageCheck,
  Truck,
  XCircle,
} from "lucide-react";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    fetchOrders();

  }, []);

  // FETCH ORDERS

  const fetchOrders = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(

        `${import.meta.env.VITE_API_URL}/api/orders`,

        {
          headers: {
            Authorization: token,
          },
        }

      );

      setOrders(res.data);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to fetch orders"
      );

    }

  };

  // UPDATE STATUS

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.put(

        `${import.meta.env.VITE_API_URL}/api/orders/${id}`,

        { status },

        {
          headers: {
            Authorization: token,
          },
        }

      );

      toast.success(res.data.message);

      fetchOrders();

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update order"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-[#f5f7fb] py-6 px-4 md:px-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="mb-7">

          <h1 className="text-3xl font-bold text-[#081028]">

            Manage Orders

          </h1>

          <p className="text-gray-500 mt-1">

            Track and manage customer orders

          </p>

        </div>

        {/* EMPTY */}

        {orders.length === 0 ? (

          <div className="bg-white rounded-2xl p-10 text-center border border-gray-200">

            <div className="flex justify-center mb-4">

              <PackageCheck
                size={45}
                className="text-gray-400"
              />

            </div>

            <h2 className="text-2xl font-bold text-gray-700">

              No Orders Found

            </h2>

          </div>

        ) : (

          <div className="space-y-5">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
              >

                {/* TOP */}

                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">

                  <div>

                    <h2 className="text-lg font-semibold text-[#081028]">

                      {order.shippingInfo?.name}

                    </h2>

                    <p className="text-sm text-gray-500">

                      {order.shippingInfo?.email}

                    </p>

                  </div>

                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >

                    {order.status}

                  </span>

                </div>

                {/* ITEMS */}

                <div className="p-5 space-y-4">

                  {order.items.map((item, index) => (

                    <div
                      key={index}
                      className="flex items-center justify-between border-b border-gray-100 pb-4"
                    >

                      {/* LEFT */}

                      <div className="flex items-center gap-4">

                        {/* IMAGE */}

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
                          className="w-16 h-20 object-cover rounded-lg border border-gray-200"
                        />

                        {/* DETAILS */}

                        <div>

                          <h3 className="font-semibold text-[#081028] text-base">

                            {item.title}

                          </h3>

                          <p className="text-sm text-gray-500 mt-1">

                            by {item.author}

                          </p>

                        </div>

                      </div>

                      {/* PRICE */}

                      <h2 className="text-lg font-bold text-green-600">

                        ₹{item.price}

                      </h2>

                    </div>

                  ))}

                  {/* BOTTOM */}

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2">

                    {/* TOTAL */}

                    <div>

                      <p className="text-sm text-gray-500">

                        Total Amount

                      </p>

                      <h2 className="text-3xl font-bold text-[#081028]">

                        ₹{
                          order.totalPrice ||
                          order.items.reduce(
                            (total, item) =>
                              total + item.price,
                            0
                          )
                        }

                      </h2>

                    </div>

                    {/* BUTTONS */}

                    <div className="flex gap-3">

                      {/* DELIVER */}

                      <button
                        onClick={() =>
                          updateStatus(
                            order._id,
                            "Delivered"
                          )
                        }
                        disabled={loading}
                        className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all duration-300 disabled:opacity-70"
                      >

                        <Truck size={16} />

                        {loading
                          ? "Updating..."
                          : "Mark Delivered"}

                      </button>

                      {/* CANCEL */}

                      <button
                        onClick={() =>
                          updateStatus(
                            order._id,
                            "Cancelled"
                          )
                        }
                        disabled={loading}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all duration-300 disabled:opacity-70"
                      >

                        <XCircle size={16} />

                        {loading
                          ? "Updating..."
                          : "Cancel Order"}

                      </button>

                    </div>

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

export default AdminOrders;