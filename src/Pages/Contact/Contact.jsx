import React from "react";
import { useForm } from "react-hook-form";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineArrowRight,
} from "react-icons/hi";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const Contact = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    const contact = {
      user_name: data.name,
      industry: data.industry,
      message: data.message,
      user_email: data.email,
      user_image: user?.photoURL,
    };
    console.log(data.name);
    axiosSecure
      .post("/contact", contact)
      .then((res) => {
        if (res.data.insertedId) {
          reset();
          Swal.fire({
            title: "Success!",
            text: "Your message has been sent successfully.",
            icon: "success",
            confirmButtonColor: "#0070f3",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      {/* Main Container: Responsive width and padding */}
      <div className="bg-[#9a909035] rounded-[2.5rem] shadow-sm w-full max-w-6xl flex flex-col lg:flex-row overflow-hidden p-6 sm:p-10 md:p-16 lg:p-20 gap-12 lg:gap-24">
        {/* Left Section: Content */}
        <div className="flex-1 flex flex-col justify-center space-y-6 md:space-y-8">
          <header className="space-y-4">
            <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
              We're here to help you
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-[1.1]">
              Discuss{" "}
              <span className="text-slate-800">
                Your Chemical Solution Needs
              </span>
            </h1>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-md">
              Are you looking for top-quality chemical solutions tailored to
              your needs? Reach out to us.
            </p>
          </header>
          {/* Contact Info Items */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-4 group">
              <div className="bg-[#0070f3] p-3 rounded-xl text-white shadow-lg shadow-blue-100 transition-transform group-hover:scale-105">
                <HiOutlineMail size={22} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  E-mail
                </p>
                <p className="text-slate-800 font-semibold break-all">
                  nihadbhuiyanb@gmail.com
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="bg-[#0070f3] p-3 rounded-xl text-white shadow-lg shadow-blue-100 transition-transform group-hover:scale-105">
                <HiOutlinePhone size={22} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  Phone number
                </p>
                <p className="text-slate-800 font-semibold">+8801916461450</p>
              </div>
            </div>
          </div>
        </div>
        {/* Right Section: Responsive Form Card */}
        <div className="flex-1 w-full max-w-lg mx-auto lg:max-w-none">
          <div className="bg-gray-50/60 border border-gray-100 rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-inner">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 ml-1">
                    Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    defaultValue={user?.displayName}
                    className="w-full bg-white border border-transparent rounded-2xl px-5 py-3.5 text-sm shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 ml-1">
                    Email
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    defaultValue={user?.email}
                    readOnly
                    className="w-full bg-white border border-transparent rounded-2xl px-5 py-3.5 text-sm shadow-sm focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 ml-1">
                    Occupation
                  </label>
                  <div className="relative">
                    <select
                      {...register("industry")}
                      className="w-full bg-white border border-transparent rounded-2xl px-5 py-3.5 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none appearance-none text-gray-500"
                    >
                      <option value="">Select...</option>
                      <option value="doctor">Doctor</option>
                      <option value="nurse">Nurse</option>
                      <option value="pharmacist">Pharmacist</option>
                      <option value="engineer">Engineer</option>
                      <option value="software_developer">
                        Software Developer
                      </option>
                      <option value="data_analyst">Data Analyst</option>
                      <option value="teacher">Teacher</option>
                      <option value="student">Student</option>
                      <option value="business_owner">Business Owner</option>
                      <option value="freelancer">Freelancer</option>
                      <option value="agriculture">Agriculture</option>
                      <option value="farmer">Farmer</option>
                      <option value="manufacturing_worker">
                        Manufacturing Worker
                      </option>
                      <option value="industrial_worker">
                        Industrial Worker
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="Wait 19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 ml-1">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    placeholder="Type your message"
                    rows={4}
                    className="w-full bg-white border border-transparent rounded-2xl px-5 py-3.5 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none resize-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="group flex items-center w-fit bg-[#0070f3] hover:bg-blue-700 text-white rounded-full p-1.5 pr-8 transition-all duration-300 shadow-xl shadow-blue-200 active:scale-95"
                >
                  <div className="bg-white text-blue-600 rounded-full p-2.5 mr-4 shadow-sm">
                    <HiOutlineArrowRight
                      size={20}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                  <span className="text-sm font-bold tracking-tight">
                    Get a Solution
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
