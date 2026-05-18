import React from "react";
import Container from "../Container/Container";
import { Link } from "react-router";
import { GiChewedHeart } from "react-icons/gi";
import useAuth from "../../Hook/useAuth";

const Navbar = () => {
  const { UserSingOut, user } = useAuth();

  const handleSingOut = () => {
    UserSingOut();
  };

  const phnLink = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>

      <li>
        <Link to={"/publiclessons"}>Public Lessons</Link>
      </li>

      <li>
        <Link to={"/pricing/upgrade"}>Pricing</Link>
      </li>

      {user && (
        <li>
          <Link to={"/dashboard"}>Dashboard</Link>
        </li>
      )}

      <li>
        {user ? (
          <button onClick={handleSingOut}>Sign Out</button>
        ) : (
          <Link to={"/login"}>Log In</Link>
        )}
      </li>
    </>
  );

  const link = (
    <>
      <li className="relative group">
        <Link
          className="text-[#454564] font-medium transition-all duration-300"
          to={"/"}
        >
          Home
        </Link>

        <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#454564] transition-all duration-300 group-hover:w-full"></span>
      </li>

      <li className="relative group">
        <Link
          className="text-[#454564] font-medium transition-all duration-300"
          to={"/publiclessons"}
        >
          Public Lessons
        </Link>

        <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#454564] transition-all duration-300 group-hover:w-full"></span>
      </li>

      <li className="relative group">
        <Link
          className="text-[#454564] font-medium transition-all duration-300"
          to={"/pricing/upgrade"}
        >
          Pricing
        </Link>
        <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#454564] transition-all duration-300 group-hover:w-full"></span>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <Container>
        <Container>
          <div className="navbar py-3 px-0">
            {/* Left */}
            <div className="navbar-start">
              {/* Mobile Menu */}
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden hover:bg-[#f2f2f7]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#31315d]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-4 z-[1] p-4 shadow-2xl bg-white rounded-3xl w-60 border border-gray-100 space-y-1"
                >
                  {phnLink}
                </ul>
              </div>

              {/* Logo */}
              <Link
                to={"/"}
                className="flex items-center text-2xl font-black text-[#31315d]"
              >
                <span className="text-4xl">
                  <GiChewedHeart />
                </span>

                <span>.com</span>
              </Link>
            </div>

            {/* Center */}
            <div className="navbar-center hidden lg:flex">
              <ul className="flex items-center gap-8">{link}</ul>
            </div>

            {/* Right */}
            <div className="navbar-end">
              {user ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="cursor-pointer">
                    <img
                      className="h-12 w-12 rounded-full border-2 border-[#31315d] object-cover hover:scale-105 transition-all duration-300"
                      src={user.photoURL}
                      alt="user"
                    />
                  </div>

                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-white rounded-3xl z-[1] w-72 mt-4 p-4 shadow-2xl border border-gray-100"
                  >
                    <div className="pb-3 border-b border-gray-100">
                      <h1 className="font-bold text-lg text-[#31315d]">
                        {user.displayName}
                      </h1>

                      <p className="text-sm text-gray-500 break-all">
                        {user.email}
                      </p>
                    </div>

                    <div className="pt-3 space-y-1">
                      <li>
                        <Link
                          className="rounded-xl hover:bg-[#f5f5ff]"
                          to={"/profile"}
                        >
                          Profile
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="rounded-xl hover:bg-[#f5f5ff]"
                          to={"/dashboard"}
                        >
                          Dashboard
                        </Link>
                      </li>

                      <li>
                        <button
                          onClick={handleSingOut}
                          className="rounded-xl text-red-500 hover:bg-red-50"
                        >
                          Sign Out
                        </button>
                      </li>
                    </div>
                  </ul>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-3">
                  <Link to={"/login"}>
                    <button className="px-5 py-2 rounded-2xl border-2 border-[#31315d] text-[#31315d] hover:bg-[#31315d] hover:text-white transition-all duration-300">
                      Log In
                    </button>
                  </Link>

                  <Link to={"/register"}>
                    <button className="px-5 py-2 rounded-2xl bg-[#31315d] text-white border-2 border-[#31315d] hover:scale-105 transition-all duration-300 shadow-lg">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default Navbar;
