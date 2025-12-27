import Login from "../pages/Login/Login";
import NotesPage from "../pages/NotesPage/NotesPage";
import NotPoundPage from "../pages/NotPoundPage/NotPoundPage";

export const routes = [
  {
    path: "/login",
    page: Login,
  },
  {
    path: "/my-notes",
    page: NotesPage,
  },
  {
    path: "/signup",
    // page: Register,
  },
  {
    path: "*",
    page: NotPoundPage,
  },
];
