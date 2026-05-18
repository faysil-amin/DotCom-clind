import React from "react";
import { FaGhost } from "react-icons/fa";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router";

const Error = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="min-h-screen bg-[#f1f1f1] flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm w-full max-w-4xl min-h-[450px] md:aspect-[16/10] flex flex-col items-center justify-center text-center p-6 md:p-12 transition-all duration-300">
        <div className="relative flex items-center justify-center mb-4 scale-90 sm:scale-100">
          <h1 className="text-[100px] sm:text-[140px] md:text-[180px] font-black text-[#e31e24] leading-none flex items-center select-none tracking-tighter">
            4
            <div className="relative inline-block mx-1 md:mx-2">
              <span className="opacity-0">0</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[75px] h-[75px] sm:w-[100px] sm:h-[100px] md:w-[130px] md:h-[130px] bg-[#e31e24] rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-inner">
                  <FaGhost className="text-white text-4xl sm:text-6xl md:text-7xl animate-bounce" />
                </div>
              </div>
            </div>
            4
          </h1>
        </div>
        <div className="space-y-3 md:space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Page not found
          </h2>

          <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-xs sm:max-w-md mx-auto leading-relaxed">
            The Page you are looking for doesn't exist or an other error
            occurred.{" "}
            <button
              onClick={() => goBack()}
              className="text-[#e31e24] font-semibold hover:underline transition-colors"
            >
              Go back
            </button>
            , or head over to
            <a
              href="/"
              className="text-[#e31e24] font-bold hover:underline ml-1"
            >
              Home
            </a>
          </p>
        </div>

        {/* ব্যাক টু হোম বাটন */}
        <div className="mt-8 md:mt-12">
          <a
            href="/"
            className="group flex items-center gap-2 px-8 py-3 bg-[#e31e24] text-white rounded-full text-sm sm:text-base font-semibold shadow-lg shadow-red-100 hover:bg-red-700 hover:shadow-red-200 transition-all active:scale-95"
          >
            <HiOutlineArrowNarrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Error;
