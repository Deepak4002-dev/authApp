import React from "react";
import Logout from "../../components/auth/Logout.jsx";

const UserDashboard = () => {
  return (
    <div className="h-full w-screen">
      <h1 className="mt-8 w-full text-center text-3xl">
        Welcome to Dashboard UserDashboard
      </h1>
      <Logout className={"text-white rounded-lg "}> Logout </Logout>
    </div>
  );
};

export default UserDashboard;
