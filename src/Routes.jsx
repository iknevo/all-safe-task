import { createBrowserRouter, Navigate } from "react-router";
import ProjectsContainer from "./features/projects/ProjectsContainer";
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
        element: <ProjectsContainer />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
export default Router;
