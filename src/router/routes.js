import AuthSuccess from "../pages/AuthSuccess/AuthSuccess";
import Login from "../pages/Login/Login";
import NotPoundPage from "../pages/NotPoundPage/NotPoundPage";
import Register from "../pages/Register/Register";

export const routes = [
  {
    path: "/login",
    page: Login,
  },
  {
    path: "/auth-success",
    page: AuthSuccess,
  },
  {
    path: "/signup",
    page: Register,
  },
  {
    path: "*",
    page: NotPoundPage,
  },
];
