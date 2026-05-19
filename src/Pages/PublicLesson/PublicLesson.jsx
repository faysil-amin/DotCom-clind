import React, { useRef, useState } from "react";
import Container from "../../Component/Container/Container";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading&error/Loading/Loading";
import { RiShareForwardLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { FaBookmark, FaRegCommentAlt } from "react-icons/fa";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  XShareButton,
  XIcon,
} from "react-share";

import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";
import useAxios from "../../Hook/useAxios";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const PublicLesson = () => {
  const comment = useRef(null);

  const [like, setLike] = useState({});
  const [selectedLesson, setSelectedLesson] = useState(null);

  const { user } = useAuth();
  const axiospublic = useAxios();
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(0);
  const limit = 6;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // LESSON DATA
  const {
    data = { result: [], total: 0 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["public Lesson", currentPage],
    queryFn: async () => {
      const res = await axiospublic.get(
        `/addlesson?skip=${currentPage}&limit=${limit}`,
      );
      return res.data;
    },
  });

  const totalPage = Math.ceil(data.total / limit);
  const pages = [...Array(totalPage).keys()];

  // REACTION DATA
  const { data: reaction = [], refetch: newRefatch } = useQuery({
    queryKey: ["userReaction", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/userReaction/${user.email}`);
      return res.data;
    },
  });

  // LIKE FIXED
  const handleLike = async (res) => {
    if (!user) {
      return Swal.fire({
        icon: "warning",
        title: "Please login first",
      });
    }

    const id = res._id;
    const isLike = like[id];
    const status = isLike ? "dislike" : "like";

    try {
      await axiosSecure.patch(`/addlesson/${id}/like`, {
        like_lesson: status,
      });

      await axiosSecure.post("/userReaction", {
        lesson_title: res.lesson_title,
        islike: status,
        user_email: user.email,
        lessonId: id,
      });

      setLike((prev) => ({ ...prev, [id]: !isLike }));

      refetch();
      newRefatch();
    } catch (err) {
      console.log(err);
    }
  };

  // STATUS
  const getStatus = (id) => {
    const found = reaction.find((r) => r.lessonId === id);
    return found?.islike;
  };

  // SAVE
  const handlesave = async (res) => {
    if (!user) {
      return Swal.fire({
        icon: "warning",
        title: "Please login first",
      });
    }

    try {
      const saveObject = {
        lessonId: res._id,
        lesson_title: res.lesson_title,
        user_email: user.email,
      };

      const result = await axiosSecure.post("/lessonSave", saveObject);

      if (result.data.insertedId) {
        Swal.fire({
          title: "Lesson Saved!",
          icon: "success",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // OPEN MODAL
  const commentHandle = (lesson) => {
    setSelectedLesson(lesson);
    comment.current?.showModal();
  };

  // COMMENT SUBMIT FIXED
  const handleCommentText = async (formData) => {
    try {
      const commentData = {
        user_name: user.displayName,
        user_image: user.photoURL,
        lessonId: selectedLesson._id,
        lesson_title: selectedLesson.lesson_title,
        comment: formData.comment,
      };

      await axiosSecure.post("/comment", commentData);

      // direct close
      comment.current.close();

      reset();

      Swal.fire({
        icon: "success",
        title: "Comment Added",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <Container>
        {/* cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.result.map((res) => (
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
                <div className="mt-auto flex items-center justify-between gap-2 flex-wrap">
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

                    <ul className="dropdown-content menu p-2 shadow-lg bg-white rounded-xl w-48">
                      <li>
                        <div className="flex gap-3 justify-center">
                          <FacebookShareButton url="https://www.facebook.com">
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>

                          <LinkedinShareButton url="https://www.linkedin.com">
                            <LinkedinIcon size={32} round />
                          </LinkedinShareButton>

                          <XShareButton url="https://x.com/">
                            <XIcon size={32} round />
                          </XShareButton>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* like */}
                  <button
                    onClick={() => handleLike(res)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border transition ${
                      getStatus(res._id) === "like"
                        ? "bg-red-50 text-red-500 border-red-200"
                        : "border-gray-300 hover:bg-red-50 hover:text-red-500"
                    }`}
                  >
                    <CiHeart />
                    {res.lesson_like}
                  </button>

                  {/* comment */}
                  <button
                    onClick={() => commentHandle(res)}
                    className="hover:bg-gray-900 hover:text-white flex items-center gap-1 px-3 py-2 rounded-lg border transition"
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

        {/* pagination */}
        <div className="my-10">
          <div className="flex gap-2 justify-center items-center flex-wrap">
            <button
              className="btn"
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 0}
            >
              Prev
            </button>

            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`btn btn-sm ${
                  currentPage === page ? "btn-primary" : ""
                }`}
              >
                {page + 1}
              </button>
            ))}

            <button
              className="btn"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage + 1 === totalPage}
            >
              Next
            </button>
          </div>
        </div>

        {/* modal */}
        <dialog ref={comment} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box rounded-3xl bg-white p-6 md:p-8">
            <h3 className="text-2xl font-bold text-[#31315d]">Add Comment</h3>

            <p className="text-sm text-gray-500 mt-2">
              {selectedLesson?.lesson_title}
            </p>

            <form
              onSubmit={handleSubmit(handleCommentText)}
              className="space-y-5"
            >
              <textarea
                {...register("comment", { required: true })}
                rows={5}
                className="textarea textarea-bordered w-full"
                placeholder="Write your comment..."
              />

              {errors.comment && (
                <p className="text-red-500">Comment is required</p>
              )}

              <div className="modal-action flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => comment.current?.close()}
                  className="px-5 py-2 border rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-[#31315d] text-white rounded-xl"
                >
                  Submit Comment
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </Container>
    </div>
  );
};

export default PublicLesson;
