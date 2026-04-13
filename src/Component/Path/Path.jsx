import { createBrowserRouter } from "react-router";
import Root from "../../Root/Root";
import Home from "../Home/Home";
import RegisterLoginHome from "../RegisterLogin/RegisterLoginHome/RegisterLoginHome";
import Login from "../Login/Login";
import Register from "../Register/Register";

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
    Component: RegisterLoginHome,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
