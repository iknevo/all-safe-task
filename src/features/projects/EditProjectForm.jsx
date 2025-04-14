import { useForm } from "react-hook-form";
import { useUpdateProject } from "./useUpdateProject";

export default function EditProjectForm({ project, setOpenId }) {
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
          setOpenId(null);
        },
      }
    );

    // Add your submission logic here
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-1"
    >
      <div className="flex flex-col gap-1">
        <input
          type="text"
          placeholder="title"
          {...register("title", { required: "This field is required!" })}
          className="p-2 rounded bg-primary-950 text-white"
          // onClick={(e) => e.stopPropagation()}
        />
        {errors?.title?.message && (
          <span className="text-sm text-red-600">{errors.title.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <textarea
          placeholder="description"
          {...register("description", { required: "This field is required!" })}
          className="resize-none p-2 h-[100px] rounded bg-primary-950 text-white"
          // onClick={(e) => e.stopPropagation()}
        />

        {errors?.description?.message && (
          <span className="text-sm text-red-600">
            {errors.description.message}
          </span>
        )}
      </div>
      <button
        className="bg-primary-700 cursor-pointer text-[16px] self-end px-2 py-1 rounded-md text-white uppercase"
        type="submit"
      >
        {isPending ? "Updating" : "Save"}
      </button>
    </form>
  );
}
