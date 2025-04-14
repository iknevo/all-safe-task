import { Outlet } from "react-router";
import Header from "./Header";

export default function DefaultLayout() {
  return (
    <div className="bg-white/5 py-2 px-4 backdrop-blur-2xl w-[calc(100%-2rem)] my-4 mx-auto rounded-md min-h-[calc(100vh-2rem)]">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}
