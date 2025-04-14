import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateProject as updateProjectApi } from "../../services/apiProjects";

export function useUpdateProject() {
  const queryClient = useQueryClient();
  const { mutate: updateProject, isPending } = useMutation({
    mutationFn: ({ updatedProject, id }) =>
      updateProjectApi(updatedProject, id),
    onSuccess: () => {
      toast.success("Project updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
  return { updateProject, isPending };
}
