import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import {
    FaHeart,
    FaBookmark,
    FaCalendarAlt,
} from "react-icons/fa";
import Loading from "../../Pages/Loading&error/Loading/Loading";

const WeeklyPopulerLesson = () => {
    const axios = useAxios();

    const { data: weeklyLessonData = [], isLoading } = useQuery({
        queryKey: ["weeklyLesson"],
        queryFn: async () => {
            const res = await axios.get("/toptwopost");
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-60">
                <Loading></Loading>
            </div>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            {/* Heading */}
            <div className="text-left mb-14">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#31315d]">
                    Weekly Popular Lessons
                </h2>
                <p className="mt-3 text-gray-500 max-w-2xl">
                    Explore the most loved lessons published in the last 7 days.
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {weeklyLessonData.map((lesson) => (
                    <div
                        key={lesson._id}
                        className="group bg-white rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                    >
                        {/* Image */}
                        <div className="relative overflow-hidden">
                            <img
                                src={lesson.lesson_image}
                                alt={lesson.lesson_title}
                                className="w-full h-50 object-cover group-hover:scale-110 duration-700"
                            />

                            {/* Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#31315d]/90 via-[#31315d]/20 to-transparent"></div>

                            {/* Category */}
                            <div className="absolute top-5 left-5">
                                <span className="bg-white text-[#31315d] font-semibold px-4 py-2 rounded-full shadow-lg">
                                    {lesson.lesson_category}
                                </span>
                            </div>

                            {/* Like Badge */}
                            <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg">
                                <FaHeart className="text-red-500" />
                                <span className="font-bold">{lesson.lesson_like}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-7">

                            <h3 className="text-2xl font-bold text-[#31315d] line-clamp-1">
                                {lesson.lesson_title}
                            </h3>

                            <p className="text-gray-600 mt-4 leading-7 line-clamp-3">
                                {lesson.lesson_description}
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mt-3">

                                <div className="bg-slate-100 rounded-2xl py-4 text-center">
                                    <FaHeart className="mx-auto text-red-500 text-xl mb-2" />
                                    <h4 className="font-bold text-[#31315d]">
                                        {lesson.lesson_like}
                                    </h4>
                                    <p className="text-xs text-gray-500">Likes</p>
                                </div>

                                <div className="bg-slate-100 rounded-2xl py-4 text-center">
                                    <FaBookmark className="mx-auto text-[#31315d] text-xl mb-2" />
                                    <h4 className="font-bold text-[#31315d]">
                                        {lesson.lesson_save}
                                    </h4>
                                    <p className="text-xs text-gray-500">Saved</p>
                                </div>

                                <div className="bg-slate-100 rounded-2xl py-4 text-center">
                                    <FaCalendarAlt className="mx-auto text-[#31315d] text-xl mb-2" />
                                    <p className="text-xs text-gray-600 px-2">
                                        {new Date(lesson.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WeeklyPopulerLesson;