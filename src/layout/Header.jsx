import { Link } from "react-router";

export default function Header() {
  return (
    <div className=" flex justify-between p-1">
      <Link to="/dashboard" className="text-2xl text-white font-semibold">
        Home
      </Link>
      <button className="bg-primary-500 text-white font-bold hover:bg-primary-400 hover:text-primary-950 transition-all duration-200 rounded-md py-2 px-4 cursor-pointer ">
        Login
      </button>
    </div>
  );
}
