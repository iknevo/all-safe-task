import { createBrowserRouter, Navigate } from "react-router";
import Kanban from "./features/tasks/Kanban";
import DefaultLayout from "./layout/DefaultLayout";
import PageNotFound from "./pages/PageNotFound";
import ProjectsPage from "./pages/ProjectsPage";

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
        element: <ProjectsPage />,
      },
      {
        path: "projects/:id",
        element: <Kanban />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
export default Router;
