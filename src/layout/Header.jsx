import { Link } from "react-router";

export default function Header() {
  return (
    <header className="flex justify-between px-1 py-4 border-b-1 border-primary-100/20">
      <Link
        to="/projects"
        className="text-2xl tracking-widest text-white font-semibold uppercase"
      >
        NotSafe task
      </Link>
      <button className="bg-primary-500 text-white font-bold hover:bg-primary-400 hover:text-primary-950 transition-all duration-200 rounded-md py-2 px-4 cursor-pointer ">
        Login
      </button>
    </header>
  );
}
