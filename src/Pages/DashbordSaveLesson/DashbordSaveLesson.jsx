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
    <Container>
      <div>
        <h1>
          Lesson Save:{" "}
          <span className="text-red-500 font-bold">
            {saveLessonData.length}
          </span>
        </h1>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Lesson Image</th>
                    <th>Lesson Titel</th>
                    <th>Lesson Like</th>
                    <th>lesson Save</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {saveLessonData.map((res) => (
                    <tr>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={res.lesson_image}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{res.lesson_title}</td>
                      <td>{res.lesson_like}</td>
                      <td>{res.lesson_save}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default DashbordSaveLesson;
