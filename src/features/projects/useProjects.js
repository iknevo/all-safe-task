import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProjects, updateProject } from "../../services/apiProjects";
import toast from "react-hot-toast";

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

export function useUpdateProject() {
  const queryClient = useQueryClient();

  const { mutate: updateProjectMutation, isPending } = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      toast.success("Project updated successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update project");
    },
  });

  return { updateProject: updateProjectMutation, isUpdating: isPending };
}
