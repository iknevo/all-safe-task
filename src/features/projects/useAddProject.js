import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addProject as addProjectApi } from "../../services/apiProjects";

export function useAddProject() {
  const queryClient = useQueryClient();
  const { mutate: addProject, isPending } = useMutation({
    mutationFn: (project) => addProjectApi(project),
    onSuccess: () => {
      toast.success("Project added successfully!");
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
  return { addProject, isPending };
}
