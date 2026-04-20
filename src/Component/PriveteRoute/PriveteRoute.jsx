import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../../Hook/useAuth";

const PriveteRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  if (loading) {
    return <Navigate to={"/loading"}></Navigate>;
  }
  if (!user) {
    return <Navigate state={location?.pathname} to={"/login"}></Navigate>;
  }
  return children;
};

export default PriveteRoute;
