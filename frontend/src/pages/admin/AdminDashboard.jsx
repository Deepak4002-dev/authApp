import React from "react";
import Logout from "../../components/auth/Logout.jsx";

const AdminDashboard = () => {
  return (
    <div className="h-full w-screen">
      <h1 className="mt-8 w-full text-center text-3xl">
        Welcome to Admin Dashboard
      </h1>
      <Logout className={"text-white rounded-lg "}> Logout </Logout>
    </div>
  );
};

export default AdminDashboard;
