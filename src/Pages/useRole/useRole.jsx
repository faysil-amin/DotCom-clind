import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: role = "user" } = useQuery({
    queryKey: ["userRole", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}/role`);
      return res.data?.role || "user";
    },
  });
  return role;
};

export default useRole;
