import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useAddProject } from "./useAddProject";

export default function AddProjectForm({ onCloseModal }) {
  // console.log(project);
  const { addProject, isPending } = useAddProject();

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  // console.log(formState);
  // console.log(errors);

  function onSubmit(data) {
    console.log("Submitted data:", data);
    const newProject = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString().slice(0, -1),
      tasks: [],
    };
    console.log(newProject);
    addProject(newProject, {
      onSuccess: () => {
        onCloseModal?.();
      },
    });
  }

  function onCancel(e) {
    e.preventDefault();
    onCloseModal?.();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-2 w-[300px] md:w-[500px]"
    >
      <h3 className="text-xl text-neutral-950 font-semibold text-center">
        Add Project
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
          {isPending ? "Adding" : "Add"}
        </button>
      </div>
    </form>
  );
}
