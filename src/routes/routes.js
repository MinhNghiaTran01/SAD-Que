import LayoutDefault from "../Layouts/LayoutDefault";
import Login from "../pages/Login/login";
import UserProfile from "../pages/User/UserProfile";
import AllProducts from "../Products/AllProducts/allProducts";
import Book from "../Products/Book/book";
import Clothes from "../Products/Clothes/clothes";
import Mobile from "../Products/Mobile/mobile";
export const routes = [
  {
    path: "/",
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
      {
        path: "all-products",
        element: <AllProducts />,
      },
      {
        path: "mobile",
        element: <Mobile />,
      }
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
