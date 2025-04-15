import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

export default function LoginForm() {
  const { isAuthenticated, user, dispatch } = useAuth();
  console.log(user);
  const navigate = useNavigate();
  const { register, reset, handleSubmit, formState } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    console.log("Submitted data:", data);
    if (!data.name || !data.password || !data.email) return;
    dispatch({ type: "login", payload: { ...data } });
  }

  useEffect(
    function () {
      if (isAuthenticated === true) navigate("/projects", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  function onCancel(e) {
    e.preventDefault();
    reset();
  }

  return (
    <div className="flex items-center flex-col gap-12 justify-center h-screen">
      <h1 className="text-3xl md:text-5xl uppercase text-neutral-100 font-semibold text-center">
        Login
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 w-[400px]  md:w-[650px] bg-neutral-800 py-8 px-4 rounded-md"
      >
        <div className="flex flex-col gap-2">
          <label
            className="text-neutral-300 font-semibold tracking-wide text-lg"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter Your Name"
            {...register("name", { required: "This field is required!" })}
            className="p-2 rounded bg-neutral-600 text-white"
            // onClick={(e) => e.stopPropagation()}
          />
          {errors?.name?.message && (
            <span className="text-sm text-red-600">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-neutral-300 font-semibold tracking-wide text-lg"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="Enter Your Email"
            {...register("email", {
              required: "This field is required!",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
            className="p-2 rounded bg-neutral-600 text-white"
            // onClick={(e) => e.stopPropagation()}
          />
          {errors?.email?.message && (
            <span className="text-sm text-red-600">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-neutral-300 font-semibold tracking-wide text-lg"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Your Password"
            {...register("password", { required: "This field is required!" })}
            className="p-2 rounded bg-neutral-600 text-white"
            // onClick={(e) => e.stopPropagation()}
          />

          {errors?.password?.message && (
            <span className="text-sm text-red-600">
              {errors.password.message}
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
            login
          </button>
        </div>
      </form>
    </div>
  );
}
