import React from "react";
import Container from "../Container/Container";
import { Link } from "react-router";
import { GiChewedHeart } from "react-icons/gi";
const Navbar = () => {
  const link = (
    <>
      <li className=" relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#454564] after:transition-all after:duration-300 hover:after:w-full">
        <Link to={"/"}>Home</Link>
      </li>
      <li className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#454564] after:transition-all after:duration-300 hover:after:w-full">
        <Link to={"/addlesson"}>Add Lesson</Link>
      </li>
      <li className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#454564] after:transition-all after:duration-300 hover:after:w-full">
        <Link to={"/mylessons"}>My Lessons</Link>
      </li>
      <li className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#454564] after:transition-all after:duration-300 hover:after:w-full">
        <Link to={"/publiclessons"}>Public Lessons</Link>
      </li>
      <li className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#454564] after:transition-all after:duration-300 hover:after:w-full">
        <Link to={"/pricing/upgrade"}>pricing/upgrade </Link>
      </li>
    </>
  );
  return (
    <Container>
      <div className="navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {link}
            </ul>
          </div>
          <a className="md:flex hidden text-2xl font-bold text-[#31315d] ">
            <p className="flex items-center">
              <span className="text-4xl">
                <GiChewedHeart />
              </span>
              .com
            </p>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="text-[#454564] flex items-center justify-center gap-4">
            {link}
          </ul>
        </div>
        <div className="navbar-end">
          <div>
            <a className="md:hidden text-2xl font-bold text-[#31315d] ">
              <p className="flex items-center">
                <span className="text-4xl">
                  <GiChewedHeart />
                </span>
                .com
              </p>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-4 ">
            <Link to={"/login"}>
              <button className=" hover:scale-105 duration-120 rounded-sm border-2 text-[#31315d] border-[#31315d] px-4 py-2">
                Log In
              </button>
            </Link>
            <Link to={"/register"}>
              <button className="hover:scale-105 duration-120 rounded-sm border-2 bg-[#31315d] text-white border-[#31315d] px-4 py-2">
                Sing In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
