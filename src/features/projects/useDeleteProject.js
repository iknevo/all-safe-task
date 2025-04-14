import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteProject as deleteProjectApi } from "../../services/apiProjects";

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const { mutate: deleteProject, isPending } = useMutation({
    mutationFn: (id) => deleteProjectApi(id),
    onSuccess: () => {
      toast.success("Project deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
  return { deleteProject, isPending };
}
