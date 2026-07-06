import React from "react";
import { HiCheckCircle } from "react-icons/hi";
import useAuth from "../../Hook/useAuth";
import {
  IoSettingsOutline,
  IoCreateOutline,
  IoBookmarkOutline,
  IoMailOutline,
  IoLocationOutline,
} from "react-icons/io5";

import { FaGithub, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";
import useRole from "../useRole/useRole";
import Chart from "./Chart";

const Profile = () => {
  const { user } = useAuth();
  const role = useRole()
  const axiosSecure = useAxiosSecure();
  const { data: lessonCount = [] } = useQuery({
    queryKey: ["lessonCount", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/addlesson/${user?.email}`);
      return res.data;
    },
  });
  const { data: userPremium = {} } = useQuery({
    queryKey: ["premiup", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Profile Layout */}
        <div className="grid lg:grid-cols-[380px,1fr] gap-8">
          {/* ================= LEFT SIDEBAR ================= */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-5 shadow-2xl h-fit">
            {/* Banner */}
            <div className="relative h-52 rounded-[30px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200"
                alt="banner"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Profile */}
            <div className="relative flex flex-col items-center -mt-16">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-[5px] border-slate-900 ring-4 ring-white/10 shadow-2xl">
                <img
                  src={userPremium.userImage}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <div className="text-center mt-5 mb-10">
                <div className="flex items-center justify-center gap-2">
                  <h1 className="text-3xl font-bold text-white">
                    {user?.displayName}
                  </h1>

                  <HiCheckCircle className="text-blue-500 text-2xl" />
                </div>
              </div>
              <div className="space-y-8">
                {/* Stats */}
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
                  <div className="bg-white/5 border border-white/10 rounded-[30px] p-6 backdrop-blur-xl">
                    <p className="text-zinc-400 text-sm">Total Posts</p>

                    <h2 className="text-4xl font-black text-white mt-3">
                      {lessonCount.length}
                    </h2>
                  </div>

                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[30px] p-6 shadow-2xl">
                    <p className="text-white/70 text-sm">Membership</p>

                    <h2 className="text-3xl font-black text-white mt-3">
                      {userPremium.user === "not_premium" ? (
                        <>Not Premium</>
                      ) : (
                        <>Premium</>
                      )}
                    </h2>
                  </div>
                  <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-[30px] p-6 shadow-2xl">
                    <p className="text-white/70 text-sm">Membership</p>

                    <h2 className="text-3xl font-black text-white mt-3">
                      {role}
                    </h2>
                  </div>
                </div>


                {/* About */}
                <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl">
                  <h2 className="text-3xl font-bold text-white">About Me</h2>

                  <p className="text-zinc-300 leading-relaxed mt-5 text-[15px]">
                    I love creating beautiful UI designs and modern web
                    applications using React, Tailwind CSS, Express.js, MongoDB,
                    and Node.js. My goal is to build fast, responsive, and
                    user-friendly applications with clean architecture and
                    premium user experiences.
                  </p>
                </div>
                {/* user & lesson growth chart */}
                {role === "admin" ? <Chart></Chart> : ""}
              </div>
              {/* Info */}
              <div className="w-full mt-8 space-y-4 flex items-center justify-center">
                <div className="flex items-center gap-3 text-zinc-300 bg-white/5 rounded-2xl px-4 py-3 border border-white/5">
                  <IoLocationOutline className="text-xl text-pink-400" />
                  <span className="text-sm">Chattogram, Bangladesh</span>
                </div>
              </div>

              {/* Social */}
              <div className="flex gap-4 mt-8">
                <a target="_blank" href="https://www.facebook.com/">
                  <button className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-105">
                    <FaFacebookF />
                  </button>
                </a>
                <a target="_blank" href="https://github.com/">
                  <button className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-slate-800 transition-all duration-300 hover:scale-105">
                    <FaGithub />
                  </button>
                </a>

                <a target="_blank" href="https://www.linkedin.com/">
                  <button className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-105">
                    <FaLinkedinIn />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
