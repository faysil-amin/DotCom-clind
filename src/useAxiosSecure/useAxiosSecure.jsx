import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "../Hook/useAuth";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, UserSingOut } = useAuth();
  useEffect(() => {
    const request = instance.interceptors.response.use((config) => {
      config.header.Authorization = `Bearer ${user.accessToken}`;
      return config;
    });
    const reject = instance.interceptors.reject.use(
      (res) => {
        return res;
      },
      (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
          UserSingOut()
            .then(() => {
              navigate("/login");
            })
            .catch(() => {});
        }
      },
    );
    return () => {
      instance.interceptors.response.eject(request);
      instance.interceptors.response.eject(reject);
    };
  }, [UserSingOut, navigate, user]);
  return instance;
};

export default useAxiosSecure;
