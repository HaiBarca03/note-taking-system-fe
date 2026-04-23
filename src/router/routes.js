import Login from "../pages/Login/Login";
import HomePage from "../pages/NoteApp/NoteApp";
import NotesPage from "../pages/NotesPage/NotesPage";
import NotPoundPage from "../pages/NotPoundPage/NotPoundPage";
import Register from "../pages/Register/Register";
import SharedNotePage from "../pages/SharedNotePage/SharedNotePage";
import SharedGroupPage from "../pages/SharedGroupPage/SharedGroupPage";
import SharedNoteInGroupPage from "../pages/SharedGroupPage/SharedNoteInGroupPage";

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
    path: "/shared-note/:token",
    page: SharedNotePage,
  },
  {
    path: "/shared-group/:token",
    page: SharedGroupPage,
  },
  {
    path: "/shared-note-in-group/:token/:noteId",
    page: SharedNoteInGroupPage,
  },
  {
    path: "*",
    page: NotPoundPage,
  },
];
