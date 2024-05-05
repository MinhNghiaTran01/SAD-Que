import LayoutDefault from "../Layouts/LayoutDefault";
import UserProfile from "../pages/User/UserProfile";
export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
    ],
  },
  {
    path: "/user-profile",
    element: <UserProfile />,
  }
];
