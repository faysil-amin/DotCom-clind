import React, { useState } from "react";
import Container from "../../Component/Container/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";
import Loading from "../Loading&error/Loading/Loading";
import { RiShareForwardLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  XShareButton,
  XIcon,
} from "react-share";
import useAuth from "../../Hook/useAuth";
const PublicLesson = () => {
  const [like, setLike] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    refetch,
    data: lesson = [],
    isLoading,
  } = useQuery({
    queryKey: ["public Lesson"],
    queryFn: async () => {
      const res = await axiosSecure.get("/addlesson");
      return res.data;
    },
  });
  const { data: reaction = [], refetch: newRefatch } = useQuery({
    queryKey: ["userReaction", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userReaction/${user?.email}`);
      return res.data;
    },
  });
  console.log(reaction);
  const handleLike = async (res) => {
    const id = res._id;
    const isLike = like[id];
    const chackLike = isLike ? "dislike" : "like";

    await axiosSecure.patch(`/addlesson/${id}/like`, {
      like_lesson: chackLike,
    });

    await axiosSecure.post("/userReaction", {
      lesson_title: res.lesson_title,
      islike: chackLike,
      user_email: user?.email,
      lessonId: id,
    });

    await axiosSecure.patch(`/userReaction/${id}/${user?.email}`, {
      islike: chackLike,
    });

    setLike((prev) => ({
      ...prev,
      [id]: !isLike,
    }));

    refetch();
    newRefatch();
  };
  const getStatus = (data) => {
    const found = reaction.find((res) => res.lessonId === data);
    return found?.islike;
  };
  const handlesave = (res) => {
    const saveObject = {
      lessonId: res._id,
      lesson_title: res.lesson_title,
      user_email: user?.email,
    };
  };
  return (
    <div>
      <Container>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {lesson.map((res) => (
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
                  <div className="card-actions flex items-center justify-center mt-auto">
                    <div className="badge badge-outline hover:bg-black hover:text-white">
                      Details
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
                    <div
                      onClick={() => handleLike(res)}
                      className={`badge badge-outline ${getStatus(res._id) === "like" ? "text-red-500" : ""}`}
                    >
                      Love: {res.lesson_like}
                      <CiHeart />
                    </div>
                    <div onClick={() => handlesave(res)} className={`text-xl`}>
                      <FaBookmark />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default PublicLesson;
