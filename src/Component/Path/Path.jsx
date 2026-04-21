import { createBrowserRouter } from "react-router";
import Root from "../../Root/Root";
import Home from "../Home/Home";
import AuthHome from "../AuthHome/AuthHome";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PriveteRoute from "../PriveteRoute/PriveteRoute";
import Dashborad from "../../Dashboard/Dashborad";
import DashboardHome from "../../Pages/DashboardHome/DashboardHome";
import Addlesson from "../../Pages/Addlesson/Addlesson";
import Error from "../../Pages/Loading&error/Error/Error";
import UserProfile from "../Profile/userProfile";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/",
    Component: AuthHome,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "*",
        Component: Error,
      },
      {
        path: "/profile",
        Component: UserProfile,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PriveteRoute>
        <Dashborad></Dashborad>
      </PriveteRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "addlesson",
        Component: Addlesson,
      },
    ],
  },
]);
