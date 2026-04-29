import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";
import Addlesson from "../Addlesson/Addlesson";
import Loading from "../Loading&error/Loading/Loading";
import { RiShareForwardLine } from "react-icons/ri";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  XIcon,
  XShareButton,
} from "react-share";
import Swal from "sweetalert2";

const MyLesson = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: lessons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["mylesson", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/addlesson/${user?.email}`);
      return res.data;
    },
  });
  console.log(lessons);
  const handleDelete = (res) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure.delete(`/addlessons/${res._id}`).then((res) => {
          if (res.status) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
          refetch();
        });
    });
  };
  return (
    <div className="mx-4">
      <h1 className="text-xl font-bold mt-2 mb-2">
        Created Lesson: <span className="text-red-500">{lessons.length}</span>
      </h1>

      <div>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {lessons.map((res) => (
              <div className="card bg-base-100 shadow-sm h-[380px] overflow-hidden">
                {/* image */}
                <figure className="h-40">
                  <img
                    src={res.lesson_image}
                    alt="lesson"
                    className="w-full h-full object-cover"
                  />
                </figure>

                {/* content */}
                <div className="card-body p-4 flex flex-col">
                  <div className="flex items-center justify-start gap-2">
                    <div className="badge bg-[#E13F7C] text-white w-fit">
                      {new Date(res.createdAt).toLocaleDateString()}
                    </div>
                    <div className="badge  bg-[#FFEF9F] w-fit">
                      category: {res.lesson_category}
                    </div>
                  </div>
                  <h2 className="card-title line-clamp-2">
                    {res.lesson_title}
                  </h2>

                  <p className="line-clamp-2 text-sm">
                    {res.lesson_description}
                  </p>

                  {/* bottom section always same position */}
                  <div className="card-actions justify-center mt-auto">
                    <div className="badge badge-outline hover:bg-black hover:text-white">
                      Details
                    </div>
                    <div
                      onClick={() => handleDelete(res)}
                      className="badge badge-outline hover:bg-black hover:text-white"
                    >
                      Delete
                    </div>
                    <div className="badge badge-outline hover:text-white hover:bg-black">
                      <div className="dropdown dropdown-top dropdown-center ">
                        <div
                          tabIndex={0}
                          role="button"
                          className="flex items-center gap-2 m-1 "
                        >
                          Share
                          <RiShareForwardLine />
                        </div>
                        <ul
                          tabIndex="-1"
                          className="dropdown-content menu bg-[#0000004c] rounded-box z-1 w-52 shadow-sm"
                        >
                          <li>
                            <div className="flex items-center justify-center">
                              <div>
                                <FacebookShareButton
                                  url={"https://www.facebook.com/profile.php"}
                                  aria-label="Share on Facebook"
                                >
                                  <FacebookIcon size={32} round />
                                </FacebookShareButton>
                              </div>
                              <div>
                                <LinkedinShareButton
                                  title="Read this next"
                                  summary="Quick summary"
                                  source="example.com"
                                  url={"https://www.linkedin.com"}
                                  aria-label="Share on LinkedIn"
                                >
                                  <LinkedinIcon size={32} round />
                                </LinkedinShareButton>
                              </div>
                              <div>
                                <XShareButton
                                  title="Read this next"
                                  via="reactshare"
                                  hashtags={["react", "share"]}
                                  url={"https://x.com/"}
                                  aria-label="Share on X"
                                >
                                  <XIcon size={32} round />
                                </XShareButton>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLesson;
