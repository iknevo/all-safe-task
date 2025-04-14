import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../../services/apiProjects";

export function useProjects() {
  const {
    data: projects = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });
  return { projects, isLoading, error };
}
