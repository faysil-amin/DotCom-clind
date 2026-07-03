import React from "react";
import { HiOutlineSparkles } from "react-icons/hi2";
import { Link } from "react-router";
import useRole from "../useRole/useRole";

const DashboardHome = () => {
  const role = useRole()
  return (
    <div className="flex items-center justify-center min-h-[75vh] px-4">
      <div className=" w-full text-center rounded-3xl p-8 md:p-12 ">
        <div className="flex justify-center mb-5">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
            <HiOutlineSparkles className="text-4xl text-green-600" />
          </div>
        </div>

        <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
          Welcome to Your Dashboard
        </span>

        <h1 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">
          Welcome Back! 👋
        </h1>
        {role === "user" && <p className="mt-4 text-gray-600 text-lg leading-relaxed">
          Every lesson you complete brings you one step closer to your goals.
          Stay consistent, keep learning, and enjoy your journey.
        </p>}
        {
          role === "admin" && <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            Manage your platform with ease. Add new lessons, organize learning content,
            and help learners grow through high-quality educational resources.
          </p>
        }

        <button className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
          {role === "user" ? <Link to="/dashboard/addlesson">Create Lesson</Link> : <Link to="/dashboard/addlessontohome">Add Lesson to Home Page</Link>}
        </button>
      </div>
    </div>
  );
};

export default DashboardHome;