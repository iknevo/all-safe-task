import { useForm } from "react-hook-form";

export default function EditProjectForm({ project }) {
  // console.log(project);

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { ...project },
  });
  const { errors } = formState;
  console.log(formState);
  console.log(errors);

  function onSubmit(e, data) {
    e.preventDefault();
    // console.log(data);
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(onSubmit(e))}
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
        {errors.title && (
          <span className="text-sm text-red-600">{errors.title}</span>
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
          <span className="text-md text-red-600">
            {errors?.description?.message}
          </span>
        )}
      </div>
      <button
        // onClick={(e) => handleSubmit(onSubmit(e))}
        className="bg-primary-700 text-[16px] self-end px-2 py-1 rounded-md text-white uppercase"
        type="submit"
      >
        Save
      </button>
    </form>
  );
}
