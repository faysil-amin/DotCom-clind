import React, { useContext } from "react";
import { AuthContext } from "../Component/Authorization/AuthContext/AuthContext";

const useAuth = () => {
  const userInfo = useContext(AuthContext);
  return userInfo;
};

export default useAuth;
