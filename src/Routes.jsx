import { createBrowserRouter, Navigate } from "react-router";
import LoginForm from "./features/auth/LoginForm";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import Kanban from "./features/tasks/Kanban";
import DefaultLayout from "./layout/DefaultLayout";
import PageNotFound from "./pages/PageNotFound";
import ProjectsPage from "./pages/ProjectsPage";

const Router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <DefaultLayout />,
      </ProtectedRoute>
    ),
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
    path: "login",
    element: <LoginForm />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
export default Router;
