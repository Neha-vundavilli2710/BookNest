import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import Home from "./pages/User/Home";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminUsers from "./pages/Admin/AdminUsers";

import AddBook from "./pages/Seller/AddBook";
import EditBook from "./pages/Seller/EditBook";

import BookDetails from "./pages/User/BookDetails";
import Cart from "./pages/User/Cart";
import Wishlist from "./pages/User/Wishlist";
import Checkout from "./pages/User/Checkout";
import MyOrders from "./pages/User/MyOrders";
import AllBooks from "./pages/User/AllBooks";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/book/:id"
          element={<BookDetails />}
        />

        <Route
          path="/books"
          element={<AllBooks />}
        />

        {/* USER PROTECTED ROUTES */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/myorders"
          element={
            <ProtectedRoute>
              {!JSON.parse(
                localStorage.getItem("user")
              )?.isAdmin ? (
                <MyOrders />
              ) : (
                <Home />
              )}
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/addbook"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddBook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editbook/:id"
          element={
            <ProtectedRoute adminOnly={true}>
              <EditBook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;