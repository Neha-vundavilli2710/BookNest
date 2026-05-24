import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({

  children,

  adminOnly = false,

}) {

  const {
    user,
    loading,
  } = useAuth();

  // LOADING

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb]">

        <h2 className="text-2xl font-bold text-[#081028]">

          Loading...

        </h2>

      </div>

    );

  }

  // NOT LOGGED IN

  if (!user) {

  return (
    <Navigate
      to="/login"
      state={{
        message:
          "Please login to continue",
      }}
    />
  );

}

  // ADMIN ROUTE PROTECTION

  if (
  adminOnly &&
  !user.isAdmin
) {

  return (
    <Navigate
      to="/"
      state={{
        message:
          "Admin access required",
      }}
    />
  );

}

  return children;

}

export default ProtectedRoute;