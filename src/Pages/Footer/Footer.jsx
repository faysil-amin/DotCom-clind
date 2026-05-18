import React from "react";
import { useForm } from "react-hook-form";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { GiChewedHeart } from "react-icons/gi";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../useAxiosSecure/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
const Footer = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const newsLetters = (res) => {
    const obj = {
      user_email: res.email,
    };
    axiosSecure
      .post("/newsLetters", obj)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Email submit susscessfully!",
            icon: "success",
            draggable: true,
          });
        }
        reset();
      })
      .catch(() => {
        Swal.fire("pleace log In First!");
      });
  };
  return (
    <footer className="mt-20 px-4 md:px-8 pb-8">
      <div className="max-w-7xl mx-auto rounded-[2.5rem] border border-white/60 bg-gradient-to-t from-transparent to-[#31315d] shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl p-4 md:p-8 lg:p-12">
        {/* CTA Section */}
        <div className="text-center max-w-3xl mx-auto py-8 md:py-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Ready to Start Your
            <br />
            Learning Journey?
          </h2>

          <p className="mt-4 text-white text-sm md:text-base leading-relaxed">
            Explore premium lessons, save your favorites, and improve your
            skills from anywhere in the world.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard/addlesson"
              className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium shadow-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>

            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-white/70 backdrop-blur-md border border-white text-slate-800 font-medium hover:bg-white transition"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Footer Card */}
        <div className="rounded-[2rem] bg-white/55 backdrop-blur-xl border border-white/60 shadow-xl p-6 md:p-10 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-10">
            {/* Brand + Newsletter */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <Link
                  to="/"
                  className="flex items-center text-2xl font-bold text-[#31315d]"
                >
                  <span className="text-4xl mr-1">
                    <GiChewedHeart />
                  </span>
                  DotCom
                </Link>
              </div>

              <p className="text-sm text-slate-600 leading-6 mb-5">
                Sign up to receive coding tips, educational resources, and the
                latest lessons directly in your inbox.
              </p>

              {/* Newsletter */}
              <form onSubmit={handleSubmit(newsLetters)}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-3xl p-2 border border-slate-200 shadow-sm w-full max-w-md gap-2 sm:gap-0">
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Enter your email"
                    className="flex-1 bg-transparent outline-none px-4 py-2 text-sm w-full"
                  />
                  <button className="px-5 py-2 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition w-full sm:w-auto">
                    Submit
                  </button>
                </div>
              </form>

              {/* Contact Info */}
              <div className="mt-6 space-y-2 text-sm text-slate-600">
                <p className="flex items-center gap-2">
                  <FaPhoneAlt className="text-blue-600" />
                  +880 1916461450
                </p>
                <p className="flex items-center gap-2">
                  <FaEnvelope className="text-blue-600" />
                  support@dotcom.com
                </p>
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-600" />
                  Chandpur, Chattogram, Bangladesh
                </p>
              </div>
            </div>

            {/* Terms & Conditions Section */}
            <div className="lg:col-span-4">
              <h4 className="font-semibold text-slate-900 mb-4 text-lg">
                Terms & Conditions
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-slate-600 leading-6">
                {/* 1 */}
                <div>
                  <h5 className="font-semibold text-slate-800 mb-2">
                    1. Acceptance of Terms
                  </h5>
                  <p>
                    By using this website, you confirm that you have read,
                    understood, and agreed to these Terms and Conditions. If you
                    do not agree, please do not use our website.
                  </p>
                </div>

                {/* 2 */}
                <div>
                  <h5 className="font-semibold text-slate-800 mb-2">
                    2. Educational Purpose
                  </h5>
                  <p>
                    All lessons, tutorials, articles, and learning materials
                    published on this website are provided for educational and
                    informational purposes only.
                  </p>
                </div>

                {/* 3 */}
                <div>
                  <h5 className="font-semibold text-slate-800 mb-2">
                    3. User Accounts
                  </h5>
                  <p className="mb-2">
                    To access certain features, you may need to create an
                    account. You agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-500">
                    <li>Provide accurate information.</li>
                    <li>Keep your login credentials secure.</li>
                    <li>
                      Be responsible for all activities under your account.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 text-center md:text-left">
              © {new Date().getFullYear()} Dot Com. All rights reserved.
            </p>

            <div className="flex items-center gap-3">
              {[
                {
                  icon: <FaFacebookF />,
                  link: "https://facebook.com",
                },
                {
                  icon: <FaLinkedinIn />,
                  link: "https://linkedin.com",
                },
                {
                  icon: <FaGithub />,
                  link: "https://github.com",
                },
                {
                  icon: <FaYoutube />,
                  link: "https://youtube.com",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
