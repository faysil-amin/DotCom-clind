import { createBrowserRouter } from "react-router";
import Root from "../../Root/Root";
import Home from "../Home/Home";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { auth } from "../../Firebase/Firebase.init";
import Auth from "../Auth/Auth";

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
]);
