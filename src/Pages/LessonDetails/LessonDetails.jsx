import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";
import Container from "../../Component/Container/Container";

import { FaHeart, FaBookmark, FaCalendarAlt, FaTag } from "react-icons/fa";
import { useParams } from "react-router";

const LessonDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: detailsData = {}, isLoading } = useQuery({
    queryKey: ["detailsLesson", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/addlesson/${id}`);
      return res.data;
    },
  });

  // loading UI
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <span className="loading loading-spinner loading-lg text-[#31315d]"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 py-10">
      <Container>
        {/* MAIN CARD */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* IMAGE */}
          <div className="relative">
            <img
              src={detailsData?.lesson_image}
              alt="lesson"
              className="w-full h-[250px] md:h-[420px] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          {/* CONTENT */}
          <div className="p-6 md:p-10 bg-gradient-to-br from-white via-[#f8f9ff] to-[#eef1ff] relative overflow-hidden">
            {/* background blur effect */}
            <div className="absolute top-0 right-0 h-72 w-72 bg-[#31315d]/10 rounded-full blur-3xl"></div>

            {/* CATEGORY + DATE */}
            <div className="relative flex flex-wrap items-center gap-3 mb-6 z-10">
              <div className="flex items-center gap-2 bg-[#31315d] text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-[#31315d]/20">
                <FaTag className="text-sm" />
                <span>{detailsData?.lesson_category}</span>
              </div>

              <div className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-5 py-2 rounded-full text-sm font-medium shadow-sm">
                <FaCalendarAlt className="text-[#31315d]" />
                <span>
                  {new Date(detailsData?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* TITLE */}
            <h1 className="relative text-3xl md:text-5xl xl:text-6xl font-black text-[#31315d] leading-tight tracking-tight z-10">
              {detailsData?.lesson_title}
            </h1>

            {/* DESCRIPTION */}
            <p className="relative mt-6 text-gray-500 text-[15px] md:text-lg leading-relaxed max-w-4xl z-10">
              {detailsData?.lesson_description}
            </p>

            {/* divider */}
            <div className="relative mt-10 mb-8 flex items-center z-10">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#31315d]/30 to-transparent"></div>
            </div>

            {/* STATS + BUTTON */}
            <div className="relative flex flex-col 2xl:flex-row gap-6 items-stretch z-10">
              {/* stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
                {/* likes card */}
                <div className="group relative bg-gradient-to-br from-[#31315d] via-[#3d3d75] to-[#5656a8] p-6 rounded-[30px] overflow-hidden shadow-xl hover:shadow-[#31315d]/30 transition-all duration-500 hover:-translate-y-1">
                  {/* glow */}
                  <div className="absolute top-[-30px] right-[-30px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm font-medium">
                        Total Likes
                      </p>

                      <h2 className="text-4xl font-black text-white mt-3">
                        {detailsData?.lesson_like}
                      </h2>
                    </div>

                    <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-3xl border border-white/10">
                      <FaHeart />
                    </div>
                  </div>
                </div>

                {/* saved card */}
                <div className="group bg-white border border-gray-200 rounded-[30px] p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">
                        Saved Lessons
                      </p>

                      <h2 className="text-4xl font-black text-[#31315d] mt-3">
                        {detailsData?.lesson_save}
                      </h2>
                    </div>

                    <div className="h-16 w-16 rounded-2xl bg-[#31315d]/10 text-[#31315d] flex items-center justify-center text-3xl">
                      <FaBookmark />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LessonDetails;
