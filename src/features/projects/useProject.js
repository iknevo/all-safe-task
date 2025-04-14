import { useQuery } from "@tanstack/react-query";
import { getProject } from "../../services/apiProjects";

export function useProject(id) {
  const {
    data: project = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProject(id),
  });
  return { project, isLoading, error };
}
