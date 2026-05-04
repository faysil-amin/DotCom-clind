import React from "react";
import { Link, Outlet } from "react-router";
import { MdAddBox } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GiChewedHeart } from "react-icons/gi";
import useRole from "../Pages/useRole/useRole";
import { FaBookOpen } from "react-icons/fa6";
import { FaRegSave } from "react-icons/fa";
const Dashborad = () => {
  const role = useRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">Navbar Title</div>
        </nav>
        {/* Page content here */}
        <div className="">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            <li>
              <Link to={"/"}>
                <button
                  className="flex items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <GiChewedHeart />
                </button>
              </Link>
            </li>
            {/* List item */}
            <li>
              <Link to={"/dashboard"}>
                <button
                  className="flex items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <IoHomeOutline />
                  <span className="is-drawer-close:hidden">Homepage</span>
                </button>
              </Link>
            </li>

            {/* List item */}
            <li>
              <Link to={"/dashboard/addlesson"}>
                <button
                  className="flex items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Add Lesson"
                >
                  {/* Settings icon */}
                  <MdAddBox />
                  <span className="is-drawer-close:hidden">Add Lesson</span>
                </button>
              </Link>
            </li>
            {/* porfile show for phone */}
            {role === "user" && (
              <li>
                <Link to={"/dashboard/profile"}>
                  <button
                    className="flex items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Profile"
                  >
                    {/* Settings icon */}
                    <CgProfile />
                    <span className="is-drawer-close:hidden">Profile</span>
                  </button>
                </Link>
              </li>
            )}
            {/* user created post */}
            {role === "user" && (
              <>
                <li>
                  <Link to={"/dashboard/createdLesson"}>
                    <button
                      className="flex items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Created Lesson"
                    >
                      {/* Settings icon */}
                      <FaBookOpen />
                      <span className="is-drawer-close:hidden">
                        Created Lesson
                      </span>
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to={"/dashboard/saveLesson"}>
                    <button
                      className="flex items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="save lesson"
                    >
                      {/* Settings icon */}
                      <FaRegSave />
                      <span className="is-drawer-close:hidden">
                        Save lesson
                      </span>
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashborad;
