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
import PublicLesson from "../../Pages/PublicLesson/PublicLesson";
import MyLesson from "../../Pages/MyLesson/MyLesson";
import DashbordSaveLesson from "../../Pages/DashbordSaveLesson/DashbordSaveLesson";
import AddLessonToHome from "../../Dashboard/AddLessonToHome/AddLessonToHome";
import Contact from "../../Pages/Contact/Contact";
import ContactMassage from "../../Pages/Contact Massage/ContactMassage";
import NewsLetters from "../../Pages/NewsLetters/NewsLetters";
import Profile from "../../Pages/Profile/Profile";
import LessonDetails from "../../Pages/LessonDetails/LessonDetails";
import PaymentSuccessFull from "../PaymentPages/PaymentSuccessFull";
import PaymentCancle from "../PaymentPages/PaymentCancle";

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
        path: "/publiclessons",
        Component: PublicLesson,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/profile",
        element: <PriveteRoute>
          <Profile></Profile>
        </PriveteRoute>
      },
      {
        path: "/lessonDetails/:id",
        Component: LessonDetails,
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
        path: "/successFullPayment",
        Component: PaymentSuccessFull,
      },
      {
        path: "/paymentCancle",
        Component: PaymentCancle,
      }
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
      {
        path: "createdLesson",
        Component: MyLesson,
      },
      {
        path: "saveLesson",
        Component: DashbordSaveLesson,
      },
      {
        path: "addlessontohome",
        Component: AddLessonToHome,
      },
      {
        path: "contactMassage",
        Component: ContactMassage,
      },
      {
        path: "newsLetters",
        Component: NewsLetters,
      },
    ],
  },
]);
