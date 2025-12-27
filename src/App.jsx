// src/App.jsx
import { Fragment, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Default from "./components/Default/Default";
import { routes } from "./router/routes";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ToastContainer />
      <Routes>
        {routes.map(
          (
            { path, page: Page, isPrivate, isShowHeader, requireAdmin },
            idx
          ) => {
            const Layout = isShowHeader ? Default : Fragment;

            const element = (
              <Layout>
                <Page />
              </Layout>
            );

            return (
              <Route
                key={idx}
                path={path}
                element={
                  isPrivate ? (
                    <ProtectedRoute requireAdmin={requireAdmin}>
                      {element}
                    </ProtectedRoute>
                  ) : (
                    element
                  )
                }
              />
            );
          }
        )}
      </Routes>
    </Suspense>
  );
}

export default App;
