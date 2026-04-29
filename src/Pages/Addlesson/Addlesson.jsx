import React from "react";
import cartoon2 from "../../assets/cartoon2.jpg";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../Hook/useAuth";
const Addlesson = () => {
  const useAxios = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const handleAddLesson = (data) => {
    console.log("HELLO");
    console.log(data);
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    const bdKey = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`;
    axios.post(bdKey, formData).then((res) => {
      const imageUrl = res.data.data.url;
      const addListonData = {
        lesson_title: data.title,
        lesson_category: data.category,
        lesson_description: data.description,
        lesson_image: imageUrl,
        lesson_like: 0,
        user_email: user?.email,
      };
      useAxios.post("/addlesson", addListonData).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Add a new post Successfully done!",
            icon: "success",
            draggable: true,
          });
        }
        navigate("/publiclessons");
        reset();
      });
    });
  };

  return (
    <div className=" px-4 flex w-full h-full md:h-screen items-center bg-[#00000025]">
      <div className="hidden md:flex items-center justify-center">
        <img src={cartoon2} className="w-[80%] h-[40vw] rounded-4xl" alt="" />
      </div>
      <div className=" flex-1 flex flex-col items-center md:px-10 md:py-15 rounded-4xl rounded-bl-none">
        <h1 className="hidden md:flex text-xl font-bold text-center  px-10 py-5 rounded-bl-none">
          {" "}
          <span className="text-2xl">
            Create a <span className="text-green-600">New Lesson –</span>
            <br />
            Start a Fresh Learning Journey 🚀
          </span>{" "}
        </h1>
        <h1 className=" md:hidden text-sm font-bold text-center  px-10 py-5 rounded-bl-none">
          {" "}
          <span className="text-lg">
            Create a <span className="text-green-600">New Lesson –</span>
            <br />
            Start a Fresh Learning Journey 🚀
          </span>{" "}
        </h1>
        <form onSubmit={handleSubmit(handleAddLesson)}>
          {/* image */}
          <fieldset className="fieldset  md:w-full ">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Pick Image</legend>
              <input
                {...register("image")}
                type="file"
                className="file-input w-full"
              />
            </fieldset>
            {/* post title */}
            <label className="label">Post Title</label>
            <input
              {...register("title", {
                required: true,
                maxLength: {
                  value: 50,
                },
              })}
              type="text"
              className="input w-full"
              placeholder="title"
            />
            {errors.title?.type === "maxLength" && (
              <p className="text-red-500">Maximum 50 characters allowed</p>
            )}
            {/* description */}
            <label className="label">Description</label>
            <textarea
              {...register("description", {
                required: true,
                maxLength: {
                  value: 150,
                },
              })}
              className="textarea w-full"
              placeholder="Discription"
            ></textarea>
            {errors.description?.type === "maxLength" && (
              <p className="text-red-500">Maximum 150 characters allowed</p>
            )}
            <div>
              <label className="label">Select Category</label>
              <div className="flex flex-col md:flex-row gap-3 md:gap-6 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    {...register("category", { required: true })}
                    type="radio"
                    className="radio"
                    value="education"
                  />
                  <span>Education</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    {...register("category", { required: true })}
                    type="radio"
                    className="radio"
                    value="happy"
                  />
                  <span>Happy</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    {...register("category", { required: true })}
                    type="radio"
                    className="radio"
                    value="love"
                  />
                  <span>Love</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    {...register("category", { required: true })}
                    type="radio"
                    className="radio"
                    value="sad"
                  />
                  <span>Sad</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    {...register("category", { required: true })}
                    type="radio"
                    className="radio"
                    value="others"
                  />
                  <span>Others</span>
                </label>
              </div>
              {errors.category?.type === "required" && (
                <p className="text-red-500">Choose post category!</p>
              )}
            </div>
            <button className=" btn btn-neutral mt-4">Create Post</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Addlesson;
