import axios from "axios";
import { useEffect } from "react";
import useAuth from "../Hook/useAuth";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, UserSingOut } = useAuth();

  useEffect(() => {

    const requestInterceptor = instance.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });
    const responseInterceptor = instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
          UserSingOut()
            .then(() => {
              navigate("/login");
            })
            .catch(() => {});
        }

        return Promise.reject(error);
      },
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, UserSingOut, navigate]);

  return instance;
};

export default useAxiosSecure;
