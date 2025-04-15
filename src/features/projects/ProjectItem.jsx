import { format } from "date-fns";
import { BsTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useDeleteProject } from "./useDeleteProject";

export default function ProjectItem({ project }) {
  const { deleteProject } = useDeleteProject();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/projects/${project.id}`)}
      className="bg-neutral-200 relative p-4 rounded-md text-lg cursor-pointer transition-all duration-300 hover:bg-neutral-950 hover:text-white"
    >
      <div className="font-bold text-xl">{project.title}</div>
      <div className="mb-2">{project.description}</div>
      <div>
        Created: {format(new Date(project.createdAt), "EEE, MMM dd yyyy")}
      </div>
      <div>{project.tasks.length} tasks</div>
      <span
        onClick={(e) => {
          e.stopPropagation();
          deleteProject(project.id);
        }}
        className="absolute right-2 bottom-2 cursor-pointer hover:scale-110 transition-all duration-150"
      >
        <BsTrashFill className="text-2xl text-red-700" />
      </span>
    </div>
  );
}
