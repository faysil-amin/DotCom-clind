import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";
import Loading from "../Loading&error/Loading/Loading";
import Container from "../../Component/Container/Container";
import Swal from "sweetalert2";

const NewsLetters = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: NewsLetters = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["newsLettersEmail"],
    queryFn: async () => {
      const res = await axiosSecure.get("/newsLetters");
      return res.data;
    },
  });
  const deleteEmail = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/newsLetters/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Email has been deleted successfully.",
              icon: "success",
            });

            refetch();
          }
        });
      }
    });
  };
  return (
    <div>
      <Container>
        <div>
          <h1>
            Lesson Save:{" "}
            <span className="text-red-500 font-bold">{NewsLetters.length}</span>
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
                      <th>Email</th>
                      <th>Submit Email</th>
                      <th>Delete User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {NewsLetters.map((res) => (
                      <tr key={res._id}>
                        <td>{res.user_email}</td>
                        <td>{new Date(res.createdAt).toLocaleString()}</td>
                        <th>
                          <button
                            onClick={() => deleteEmail(res._id)}
                            className="btn"
                          >
                            Delete
                          </button>
                        </th>
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

export default NewsLetters;
