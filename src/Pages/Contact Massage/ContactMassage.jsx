import React from "react";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Container from "../../Component/Container/Container";
import Loading from "../Loading&error/Loading/Loading";
import { FaEnvelopeOpenText } from "react-icons/fa";

const ContactMassage = () => {
  const axiosSecure = useAxiosSecure();

  const { data: massege = [], isLoading } = useQuery({
    queryKey: ["massege"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contact");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-slate-800">
              Contact Messages
            </h1>

            <p className="text-slate-500 mt-2 text-sm md:text-base">
              Manage all customer contact messages here.
            </p>
          </div>

          {/* Total Card */}
          <div className="bg-white shadow-lg rounded-3xl px-6 py-5 w-full md:w-64 border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl">
                <FaEnvelopeOpenText size={26} />
              </div>

              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Total Messages
                </p>

                <h2 className="text-3xl font-bold text-slate-800">
                  {massege.length}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Message Cards */}
        <div className="grid grid-cols-1 gap-6">
          {massege.map((res) => (
            <div
              key={res._id}
              className="bg-white rounded-3xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 mb-5">
                <div className="avatar">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden ring ring-blue-100">
                    <img
                      src={res.user_image}
                      alt="user"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    {res.user_name || "Unknown User"}
                  </h2>

                  <p className="text-sm text-slate-400 break-all">
                    {res.user_email}
                  </p>
                </div>
              </div>

              {/* Message */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <p className="text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line break-words">
                  {res.message}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-5 flex items-center justify-between gap-3 flex-wrap">
                <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full">
                  {res.industry || "General"}
                </span>

                <span className="text-xs text-slate-400">
                  {new Date(res.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
export default ContactMassage;