import { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  Users,
  Trash2,
  Mail,
} from "lucide-react";

function AdminUsers() {

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    fetchUsers();

  }, []);

  // FETCH USERS

  const fetchUsers = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(

        `${import.meta.env.VITE_API_URL}/api/users`,

        {
          headers: {
            Authorization: token,
          },
        }

      );

      setUsers(res.data);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to fetch users"
      );

    }

  };

  // DELETE USER

  const deleteUser = async (id) => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.delete(

        `${import.meta.env.VITE_API_URL}/api/users/${id}`,

        {
          headers: {
            Authorization: token,
          },
        }

      );

      toast.success(res.data.message);

      fetchUsers();

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete user"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-[#f4f7fb] py-10 px-4">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-[#081028]">

            User Management

          </h1>

          <p className="text-gray-500 mt-2 text-base">

            Manage all registered bookstore users

          </p>

        </div>

        {/* MAIN CARD */}

        <div className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden">

          {/* TOP SECTION */}

          <div className="flex items-center gap-4 px-7 py-5 bg-gradient-to-r from-blue-50 to-white border-b border-gray-100">

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

              <Users
                className="text-blue-600"
                size={28}
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-[#081028]">

                Registered Users

              </h2>

              <p className="text-gray-500 text-sm mt-1">

                Total Users: {users.length}

              </p>

            </div>

          </div>

          {/* USERS */}

          <div>

            {users.map((user) => (

              <div
                key={user._id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 px-7 py-6 border-b border-gray-100 hover:bg-gray-50 transition duration-300"
              >

                {/* LEFT */}

                <div className="flex items-center gap-4">

                  {/* AVATAR */}

                  <div className="w-16 h-16 rounded-full bg-[#081028] text-white flex items-center justify-center text-2xl font-bold shadow-sm">

                    {user.name.charAt(0).toUpperCase()}

                  </div>

                  {/* INFO */}

                  <div>

                    <h3 className="text-2xl font-semibold text-[#081028]">

                      {user.name}

                    </h3>

                    <div className="flex items-center gap-2 text-gray-500 mt-2">

                      <Mail size={16} />

                      <span className="text-base">

                        {user.email}

                      </span>

                    </div>

                    <p className="text-sm text-gray-400 mt-2">

                      ID: {user._id.slice(0, 12)}...

                    </p>

                  </div>

                </div>

                {/* DELETE BUTTON */}

                <button
                  onClick={() => deleteUser(user._id)}
                  disabled={loading}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 shadow-sm hover:scale-105 disabled:opacity-70"
                >

                  <Trash2 size={17} />

                  {loading
                    ? "Deleting..."
                    : "Delete User"}

                </button>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminUsers;