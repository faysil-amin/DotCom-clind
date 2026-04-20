import React from "react";
import AuthProvider from "../Authorization/AuthProvider/AuthProvider";
import { AuthContext } from "../Authorization/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";

const PriveteRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = AuthProvider(AuthContext);
  if (loading) {
    return <Navigate to={"/loading"}></Navigate>;
  }
  if (!user) {
    return <Navigate state={location?.pathname} to={"/login"}></Navigate>;
  }
  return children;
};

export default PriveteRoute;
