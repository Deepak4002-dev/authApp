import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, requiredRole }) => {
  const { role, isLogged } = useSelector((state) => state.auth);
  const location = useLocation();

  // Redirect to login if not authenticated
  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Check if the user has the required role
  if (requiredRole && (!role || role !== requiredRole)) {
    // Redirect to role-specific dashboard or fallback route
    return <Navigate to={role ? `/${role}-dashboard` : "/login"} />;
  }

  // Render the protected component
  return children;
};

export default PrivateRoute;

// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// const PrivateRoute = ({ children, requiredRole }) => {
//   const { role, isLogged } = useSelector((state) => state.auth);
//   const location = useLocation();

//   // If the state is still being rehydrated (i.e., role or isLogged is null), show nothing
//   if (role === null || isLogged === null) {
//     return <Navigate to="/login" />;
//   }

//   // Redirect to login if not authenticated
//   if (!isLogged) {
//     return <Navigate to="/login" state={{ from: location }} />;
//   }

//   // Check if the user has the required role
//   if (requiredRole && role !== requiredRole) {
//     return <Navigate to={`/${role}-dashboard`} />;
//   }

//   // Render the protected component
//   return children;
// };

// export default PrivateRoute;
