import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
// import UserLayout from "./components/layout/UserLayout";
// import AdminLayout from "./components/layout/AdminLayout";
import PrivateRoute from "./components/auth/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/signup",
//     element: <Signup />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/user-dashboard",
//     element: (
//       <PrivateRoute>
//         <UserDashboard requiredRole="user" />
//       </PrivateRoute>
//     ),
//   },
//   {
//     path: "/admin-dashboard",
//     element: (
//       <PrivateRoute>
//         <AdminDashboard requiredRole="admin" />
//       </PrivateRoute>
//     ),
//   },
// ]);
const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user-dashboard",
    element: (
      <PrivateRoute requiredRole="user">
        <UserDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin-dashboard",
    element: (
      <PrivateRoute requiredRole="admin">
        <AdminDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/login" />, // Fallback route for invalid paths
  },
]);
const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
