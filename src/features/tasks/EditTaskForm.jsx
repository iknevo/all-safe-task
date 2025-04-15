import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUpdateProject } from "../projects/useUpdateProject";

export default function EditTaskForm({ project, task, onCloseModal }) {
  const queryClient = useQueryClient();
  const { updateProject, isPending } = useUpdateProject();

  const formattedDueDate = format(new Date(task.dueDate), "yyyy-MM-dd");
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      ...task,
      dueDate: formattedDueDate,
    },
  });
  const { errors } = formState;

  function onSubmit(data) {
    // console.log("data to submit:", data);
    const newTask = {
      ...data,
      dueDate: new Date(data.dueDate).toISOString().slice(0, -1),
    };
    const newProject = {
      ...project,
      tasks: [...project.tasks.filter((t) => t.id !== task.id), newTask],
    };
    console.log(newTask);
    console.log(newProject);

    updateProject(
      { updatedProject: { ...newProject }, id: project.id },
      {
        onSuccess: () => {
          toast.success("Task updated successfully!");
          queryClient.invalidateQueries({
            queryKey: ["project", project.id],
          });

          queryClient.setQueryData(["project", String(project.id)], newProject);
          onCloseModal?.();
        },
      }
    );
  }

  function onCancel(e) {
    e.preventDefault();
    onCloseModal?.();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-2 w-[500px]"
    >
      <h3 className="text-xl text-neutral-950 font-semibold text-center">
        Edit Task
      </h3>
      <div className="flex flex-col gap-1">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="title"
          {...register("title", { required: "This field is required!" })}
          className="p-2 rounded bg-neutral-950 text-white"
          // onClick={(e) => e.stopPropagation()}
        />
        {errors?.title?.message && (
          <span className="text-sm text-red-600">{errors.title.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="description"
          {...register("description", { required: "This field is required!" })}
          className="resize-none p-2 h-[100px] rounded bg-neutral-950 text-white"
          // onClick={(e) => e.stopPropagation()}
        />

        {errors?.description?.message && (
          <span className="text-sm text-red-600">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="assignee">Assignee</label>
        <input
          id="assignee"
          type="text"
          placeholder="Assignee"
          {...register("assignee", { required: "This field is required!" })}
          className="p-2 rounded bg-neutral-950 text-white"
          // onClick={(e) => e.stopPropagation()}
        />
        {errors?.assignee?.message && (
          <span className="text-sm text-red-600">
            {errors.assignee.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          {...register("dueDate", { required: "This field is required!" })}
          className="p-2 rounded bg-neutral-950 text-white"
          // onClick={(e) => e.stopPropagation()}
        />
        {errors?.dueDate?.message && (
          <span className="text-sm text-red-600">{errors.dueDate.message}</span>
        )}
      </div>

      <div className="self-end flex items-center gap-2">
        <button
          type="reset"
          onClick={(e) => onCancel(e)}
          className="bg-red-800 cursor-pointer text-[16px]  px-2 py-1 rounded-md text-white uppercase"
        >
          cancel
        </button>
        <button
          className="bg-neutral-700 cursor-pointer text-[16px]  px-2 py-1 rounded-md text-white uppercase"
          type="submit"
        >
          {isPending ? "Updating" : "Update"}
        </button>
      </div>
    </form>
  );
}
