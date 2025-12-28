import Login from "../pages/Login/Login";
import HomePage from "../pages/NoteApp/NoteApp";
import NotesPage from "../pages/NotesPage/NotesPage";
import NotPoundPage from "../pages/NotPoundPage/NotPoundPage";
import Register from "../pages/Register/Register";

export const routes = [
  {
    path: "/",
    page: HomePage,
  },
  {
    path: "/login",
    page: Login,
  },
  {
    path: "/my-notes",
    page: NotesPage,
  },
  {
    path: "/register",
    page: Register,
  },
  {
    path: "*",
    page: NotPoundPage,
  },
];
