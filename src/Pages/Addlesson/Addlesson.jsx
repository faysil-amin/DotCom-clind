import React from "react";
import cartoon2 from "../../assets/cartoon2.jpg";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../Hook/useAuth";
import {
  FaImage,
  FaHeading,
  FaAlignLeft,
  FaTags,
  FaRocket,
} from "react-icons/fa";

const Addlesson = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddLesson = async (data) => {
    try {
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_key
      }`;

      const imageRes = await axios.post(imgbbUrl, formData);
      const imageUrl = imageRes.data.data.url;

      const addLessonData = {
        lesson_title: data.title,
        lesson_category: data.category,
        lesson_description: data.description,
        lesson_image: imageUrl,
        lesson_like: 0,
        user_email: user?.email,
      };

      const res = await axiosSecure.post("/addlesson", addLessonData);

      if (res.data.insertedId) {
        Swal.fire({
          title: "Lesson Added Successfully!",
          text: "Your lesson is now live.",
          icon: "success",
          confirmButtonColor: "#2563eb",
        });

        reset();
        navigate("/publiclessons");
      }
    } catch (error) {
      Swal.fire({
        title: "Something went wrong!",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
      <div className="max-w-7xl mx-auto gap-10 items-center">
        {/* Left Side Image */}

        {/* Right Side Form */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white p-6 md:p-10">
          {/* Header */}
          <div className="mb-8 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              New Educational Content
            </span>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Create a New
              <span className="block text-blue-600">Lesson</span>
            </h1>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Share your knowledge with learners around the world by publishing
              a beautiful and informative lesson.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleAddLesson)} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaImage className="text-blue-600" />
                Upload Lesson Image
              </label>
              <input
                type="file"
                {...register("image", {
                  required: "Please upload an image",
                })}
                className="file-input file-input-bordered w-full"
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaHeading className="text-blue-600" />
                Lesson Title
              </label>
              <input
                type="text"
                placeholder="Enter lesson title"
                {...register("title", {
                  required: "Title is required",
                  maxLength: {
                    value: 50,
                    message: "Maximum 50 characters allowed",
                  },
                })}
                className="input input-bordered w-full rounded-xl"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaAlignLeft className="text-blue-600" />
                Description
              </label>
              <textarea
                rows="4"
                placeholder="Write a short description..."
                {...register("description", {
                  required: "Description is required",
                  maxLength: {
                    value: 150,
                    message: "Maximum 150 characters allowed",
                  },
                })}
                className="textarea textarea-bordered w-full rounded-xl"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <FaTags className="text-blue-600" />
                Select Category
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {["education", "happy", "love", "sad", "others"].map(
                  (category) => (
                    <label key={category} className="cursor-pointer">
                      <input
                        type="radio"
                        value={category}
                        {...register("category", {
                          required: "Please select a category",
                        })}
                        className="peer hidden"
                      />
                      <div className="text-center px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 hover:border-blue-400 transition font-medium capitalize">
                        {category}
                      </div>
                    </label>
                  ),
                )}
              </div>

              {errors.category && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] hover:shadow-xl transition duration-300 flex items-center justify-center gap-2"
            >
              <FaRocket />
              Create Lesson
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addlesson;
