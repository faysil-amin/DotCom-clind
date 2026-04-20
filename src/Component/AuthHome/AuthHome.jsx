import React from "react";
import { Outlet } from "react-router";

const AuthHome = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthHome;
