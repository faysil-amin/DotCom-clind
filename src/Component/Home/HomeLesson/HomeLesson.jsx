import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hook/useAuth";
import Swal from "sweetalert2";
import { RiShareForwardLine } from "react-icons/ri";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  XIcon,
  XShareButton,
} from "react-share";
import { CiHeart } from "react-icons/ci";
import { FaBookmark, FaRegCommentAlt } from "react-icons/fa";
import useAxios from "../../../Hook/useAxios";
import Container from "../../Container/Container";
import Footer from "../../../Pages/Footer/Footer";
import { Link } from "react-router";
import WeeklyPopulerLesson from "../../WeeklyPopulerLesson/WeeklyPopulerLesson";

const HomeLesson = () => {
  const comment = useRef();
  const [like, setLike] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxios();
  const { data: homeLessonShow = [], refetch } = useQuery({
    queryKey: ["homeLesson"],
    queryFn: async () => {
      const res = await axiosPublic.get("/homeAddlesson");
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
  const handleLike = async (res) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please login first",
      });
      return;
    }
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
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please login first",
      });
      return;
    }
    const saveObject = {
      lessonId: res._id,
      lesson_title: res.lesson_title,
      user_email: user?.email,
      createdAt: res.createdAt,
      lesson_like: res.lesson_like,
      lesson_save: res.lesson_save,
      lesson_image: res.lesson_image,
    };
    axiosSecure.post("/lessonSave", saveObject).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Lesson save!",
          icon: "success",
          draggable: true,
        });
      }
    });
  };
  const handleComment = (res) => {
    res.current.showModal();
  };
  return (
    <div>
      <Container>
        <div className="my-[2vw] grid grid-cols-1 md:grid-cols-3 gap-5">
          {homeLessonShow
            .filter((res) => res.admin_select === "select")
            .map((res) => (
              <div
                key={res._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
              >
                {/* image */}
                <div className="h-44 overflow-hidden">
                  <img
                    src={res.lesson_image}
                    alt="lesson"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 text-xs rounded-full bg-pink-100 text-pink-600 font-medium">
                      {new Date(res.createdAt).toLocaleDateString()}
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">
                      {res.lesson_category}
                    </span>
                  </div>

                  {/* title */}
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
                    {res.lesson_title}
                  </h2>

                  {/* description */}
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {res.lesson_description}
                  </p>

                  {/* actions */}
                  <div className="mt-auto flex items-center justify-between gap-2">
                    {/* details */}
                    <Link to={`/lessonDetails/${res._id}`}>
                      <button className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-900 hover:text-white transition">
                        Details
                      </button>
                    </Link>

                    {/* share */}
                    <div className="dropdown dropdown-top">
                      <label
                        tabIndex={0}
                        className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-900 hover:text-white transition flex items-center gap-1 cursor-pointer"
                      >
                        Share <RiShareForwardLine />
                      </label>

                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow-lg bg-white rounded-xl w-48"
                      >
                        <li>
                          <div className="flex gap-3 justify-center">
                            <FacebookShareButton
                              url={"https://www.facebook.com/profile.php"}
                            >
                              <FacebookIcon size={32} round />
                            </FacebookShareButton>

                            <LinkedinShareButton
                              url={"https://www.linkedin.com"}
                            >
                              <LinkedinIcon size={32} round />
                            </LinkedinShareButton>

                            <XShareButton url={"https://x.com/"}>
                              <XIcon size={32} round />
                            </XShareButton>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* like */}
                    <button
                      onClick={() => handleLike(res)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border transition ${getStatus(res._id) === "like"
                        ? "bg-red-50 text-red-500 border-red-200"
                        : "border-gray-300 hover:bg-red-50 hover:text-red-500"
                        }`}
                    >
                      <CiHeart /> {res.lesson_like}
                    </button>

                    {/* comment */}
                    <button
                      onClick={() => handleComment(comment)}
                      className={`hover:bg-gray-900 hover:text-white flex items-center gap-1 px-3 py-2 rounded-lg border transition `}
                    >
                      <FaRegCommentAlt />
                    </button>
                    {/* save */}
                    <button
                      onClick={() => handlesave(res)}
                      className="text-gray-600 hover:text-black transition text-xl"
                    >
                      <FaBookmark />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <WeeklyPopulerLesson></WeeklyPopulerLesson>
      </Container>

      <Footer></Footer>
      <dialog ref={comment} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-3xl bg-white p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-[#31315d]">Add Comment</h3>

            <p className="text-sm text-gray-500 mt-2">
              Write your comment or feedback below.
            </p>
          </div>

          {/* Comment Form */}
          <form className="space-y-5">
            {/* Comment */}
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-2 block">
                Comment
              </label>

              <textarea
                placeholder="Write your comment..."
                rows={5}
                className="textarea textarea-bordered w-full rounded-2xl resize-none focus:outline-none focus:border-[#31315d]"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="modal-action flex items-center justify-end gap-3">
              <form method="dialog">
                <button className="px-5 py-2 rounded-2xl border border-gray-300 hover:bg-gray-100 transition-all duration-300">
                  Cancel
                </button>
              </form>

              <button
                type="submit"
                className="px-6 py-2 rounded-2xl bg-[#31315d] text-white hover:scale-105 transition-all duration-300"
              >
                Submit Comment
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default HomeLesson;
