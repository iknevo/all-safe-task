import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUpdateProject } from "./useUpdateProject";

export default function EditProjectForm({ project, onCloseModal }) {
  // console.log(project);
  const { updateProject, isPending } = useUpdateProject();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { ...project },
  });
  const { errors } = formState;
  // console.log(formState);
  // console.log(errors);

  function onSubmit(data) {
    console.log("Submitted data:", data);
    updateProject(
      { updatedProject: { ...data }, id: project.id },
      {
        onSuccess: () => {
          toast.success("Project updated successfully!");
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
        Edit Project
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
          {isPending ? "Updating" : "Save"}
        </button>
      </div>
    </form>
  );
}
