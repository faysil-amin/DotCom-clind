import { createBrowserRouter } from "react-router";
import Root from "../../Root/Root";
import Home from "../Home/Home";
import ErrorPage from "../ErrorPage/ErrorPage";
import Loading from "../Loading/Loading";
import AuthHome from "../AuthHome/AuthHome";
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
      {
        path: "*",
        Component: ErrorPage,
      },
      {
        path: "/loading",
        Component: Loading,
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
    ],
  },
]);
