import React from "react";
import useAuth from "../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";
import Container from "../../Component/Container/Container";
import Loading from "../Loading&error/Loading/Loading";

const DashbordSaveLesson = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: saveLessonData = [], isLoading } = useQuery({
    queryKey: ["saveLessonData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessonSave/${user?.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h1>
        Lesson Save:{" "}
        <span className="text-red-500 font-bold">{saveLessonData.length}</span>
      </h1>
    </div>
  );
};

export default DashbordSaveLesson;
