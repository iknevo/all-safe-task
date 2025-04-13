import { createBrowserRouter, Navigate } from "react-router";
import Projects from "./features/Projects";
import DefaultLayout from "./layout/DefaultLayout";
import PageNotFound from "./pages/PageNotFound";

const Router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        element: <Navigate to="projects" replace />,
        index: true,
      },
      {
        path: "projects",
        element: <Projects />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
export default Router;
