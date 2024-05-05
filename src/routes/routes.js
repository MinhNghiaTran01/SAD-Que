import LayoutDefault from "../Layouts/LayoutDefault";
import Login from "../pages/Login/login";
import UserProfile from "../pages/User/UserProfile";
import Book from "../Products/Book/book";
import Clothes from "../Products/Clothes/clothes";
export const routes = [
  {
    path: "/home",
    element: <LayoutDefault />,
    children: [
      {
        path: "book",
        element: <Book />,
      },
      {
        path: "clothes",
        element: <Clothes />,
      },
    ],
  },
  {
    path: "/user-profile",
    element: <UserProfile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
