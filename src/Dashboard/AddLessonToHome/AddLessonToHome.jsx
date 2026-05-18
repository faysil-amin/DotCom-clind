import React, { useState } from "react";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Container from "../../Component/Container/Container";
import Loading from "../../Pages/Loading&error/Loading/Loading";
import Swal from "sweetalert2";

const AddLessonToHome = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allLesson = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allLesson"],
    queryFn: async () => {
      const res = await axiosSecure.get("/addlessontohome");
      return res.data;
    },
  });
  const handleShow = (res) => {
    const checkShow =
      res.admin_select === "not select" ? "select" : "not select";
    axiosSecure
      .patch(`/addlesson/${res._id}/adminSelect`, {
        selectLesson: checkShow,
      })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Updated successfully",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Limit reached!",
          text: err.response?.data?.message || "Something went wrong",
        });
      });
  };
  return (
    <div>
      <Container>
        <div>
          <h1>
            Lesson Save:{" "}
            <span className="text-red-500 font-bold">{allLesson.length}</span>
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
                      <th>Add to Home</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {allLesson.map((res) => (
                      <tr key={res._id}>
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
                        <td className="btn" onClick={() => handleShow(res)}>
                          {res.admin_select === "select"
                            ? "selected"
                            : "select"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AddLessonToHome;
