import { HiOutlineLogout } from "react-icons/hi";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router";
import { useAuth } from "../features/auth/AuthContext";

export default function Header() {
  const { user, dispatch } = useAuth();
  return (
    <header className="flex justify-between px-1 py-4 border-b-1 border-neutral-100/20">
      <Link
        to="/projects"
        className="text-2xl tracking-widest text-white font-semibold uppercase"
      >
        NotSafe task
      </Link>
      {user?.name ? (
        <div className="flex items-center gap-2">
          <span className="text-2xl block text-neutral-300 font-semibold">
            {user.name}
          </span>
          <button
            className="cursor-pointer"
            onClick={() => dispatch({ type: "logout" })}
          >
            {/* <HiOutlineLogout className="text-neutral-300 text-2xl" /> */}
            <IoMdLogOut className="text-neutral-300 text-2xl" />
          </button>
        </div>
      ) : (
        <button className="bg-neutral-500 text-white font-bold hover:bg-neutral-400 hover:text-neutral-950 transition-all duration-200 rounded-md py-2 px-4 cursor-pointer ">
          Login
        </button>
      )}
    </header>
  );
}
