import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import {
  BookOpen,
  Users,
  ShoppingBag,
  IndianRupee,
  PackageCheck,
  Plus,
  ArrowUpRight,
  Clock3,
} from "lucide-react";

function AdminDashboard() {

  const [stats, setStats] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    fetchDashboardStats();

  }, []);

  const fetchDashboardStats = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(

        `${import.meta.env.VITE_API_URL}/api/admin/stats`,

        {
          headers: {
            Authorization: token,
          },
        }

      );

      setStats(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // LOADING

  if (!stats) {

    return (

      <div className="min-h-screen flex justify-center items-center bg-[#f5f7fb]">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-[#081028] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <h2 className="text-xl font-bold text-[#081028]">

            Loading Dashboard...

          </h2>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#f5f7fb] px-4 md:px-6 py-5">

      <div className="max-w-7xl mx-auto">

        {/* HERO SECTION */}

        <div className="bg-gradient-to-r from-[#081028] to-[#10245f] rounded-[28px] p-6 md:p-7 mb-6 text-white relative overflow-hidden shadow-lg">

          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full text-xs font-semibold mb-4">

                <Clock3 size={14} />

                BOOKNEST ADMIN PANEL

              </div>

              <h1 className="text-2xl md:text-3xl font-black leading-tight mb-4">

                Welcome Back,
                <br />
                Admin Dashboard

              </h1>

              <p className="text-gray-300 text-sm md:text-base max-w-2xl leading-relaxed">

                Monitor bookstore performance, manage orders,
                track analytics, and grow your digital library.

              </p>

            </div>

            {/* RIGHT BUTTON */}

            <div className="flex justify-start lg:justify-end">

              <button
                onClick={() => navigate("/addbook")}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded-2xl transition duration-300 flex items-center gap-2 shadow-lg"
              >

                <Plus size={18} />

                Add Book

              </button>

            </div>

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">

          {/* BOOKS */}

          <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-lg transition duration-300 border border-gray-100">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-500 text-sm font-medium">

                  Total Books

                </p>

                <h2 className="text-3xl font-black text-[#081028] mt-2">

                  {stats.totalBooks}

                </h2>

                <div className="flex items-center gap-1 mt-3 text-green-600 text-sm font-semibold">

                  <ArrowUpRight size={14} />

                  +12% this month

                </div>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                <BookOpen
                  className="text-blue-600"
                  size={24}
                />

              </div>

            </div>

          </div>

          {/* USERS */}

          <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-lg transition duration-300 border border-gray-100">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-500 text-sm font-medium">

                  Total Users

                </p>

                <h2 className="text-3xl font-black text-[#081028] mt-2">

                  {stats.totalUsers}

                </h2>

                <div className="flex items-center gap-1 mt-3 text-pink-600 text-sm font-semibold">

                  <ArrowUpRight size={14} />

                  +8% this month

                </div>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center">

                <Users
                  className="text-pink-600"
                  size={24}
                />

              </div>

            </div>

          </div>

          {/* ORDERS */}

          <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-lg transition duration-300 border border-gray-100">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-500 text-sm font-medium">

                  Total Orders

                </p>

                <h2 className="text-3xl font-black text-[#081028] mt-2">

                  {stats.totalOrders}

                </h2>

                <div className="flex items-center gap-1 mt-3 text-green-600 text-sm font-semibold">

                  <ArrowUpRight size={14} />

                  +18% this month

                </div>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

                <ShoppingBag
                  className="text-green-600"
                  size={24}
                />

              </div>

            </div>

          </div>

          {/* REVENUE */}

          <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-lg transition duration-300 border border-gray-100">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-500 text-sm font-medium">

                  Revenue

                </p>

                <h2 className="text-3xl font-black text-[#081028] mt-2">

                  ₹{stats.totalRevenue.toLocaleString()}

                </h2>

                <div className="flex items-center gap-1 mt-3 text-yellow-600 text-sm font-semibold">

                  <ArrowUpRight size={14} />

                  +25% this month

                </div>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">

                <IndianRupee
                  className="text-yellow-600"
                  size={24}
                />

              </div>

            </div>

          </div>

        </div>

        {/* RECENT ORDERS */}

        <div className="bg-white rounded-[28px] shadow-sm border border-gray-100 overflow-hidden">

          {/* HEADER */}

          <div className="bg-[#081028] px-6 py-5">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-2xl bg-yellow-400/20 flex items-center justify-center">

                <PackageCheck
                  className="text-yellow-400"
                  size={22}
                />

              </div>

              <div>

                <h2 className="text-xl font-bold text-white">

                  Recent Orders

                </h2>

                <p className="text-gray-300 text-sm mt-1">

                  Latest customer purchases and transactions

                </p>

              </div>

            </div>

          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">

            {stats.recentOrders.length === 0 ? (

              <div className="text-center py-16">

                <h2 className="text-2xl font-bold text-[#081028] mb-3">

                  No Orders Found

                </h2>

                <p className="text-gray-500">

                  Orders will appear here once customers purchase books.

                </p>

              </div>

            ) : (

              <table className="w-full">

                <thead className="bg-gray-50 border-b">

                  <tr className="text-left">

                    <th className="px-6 py-4 text-gray-500 font-semibold text-sm">

                      Customer

                    </th>

                    <th className="px-6 py-4 text-gray-500 font-semibold text-sm">

                      Items

                    </th>

                    <th className="px-6 py-4 text-gray-500 font-semibold text-sm">

                      Status

                    </th>

                    <th className="px-6 py-4 text-gray-500 font-semibold text-sm">

                      Amount

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {stats.recentOrders.map((order, index) => (

                    <tr
                      key={order._id}
                      className={`border-b hover:bg-gray-50 transition duration-300 ${
                        index % 2 === 0 ? "bg-white" : "bg-[#fafbfd]"
                      }`}
                    >

                      <td className="px-6 py-5">

                        <div>

                          <h3 className="font-bold text-[#081028] text-base">

                            {order.shippingInfo.name}

                          </h3>

                          <p className="text-gray-500 text-sm mt-1">

                            {order.shippingInfo.email}

                          </p>

                        </div>

                      </td>

                      <td className="px-6 py-5">

                        <div className="font-bold text-base text-[#081028]">

                          {order.items.length}

                        </div>

                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`px-4 py-2 rounded-full text-xs font-semibold ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Cancelled"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >

                          {order.status}

                        </span>

                      </td>

                      <td className="px-6 py-5">

                        <h3 className="font-black text-2xl text-green-600">

                          ₹{order.totalPrice}

                        </h3>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;