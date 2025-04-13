import { Outlet } from "react-router";
import Header from "./Header";

export default function DefaultLayout() {
  return (
    <div className="bg-white/5 py-2 px-4 backdrop-blur-2xl w-[calc(100%-4rem)] my-4 mx-auto rounded-md">
      <Header />
      <Outlet />
    </div>
  );
}
