import { format } from "date-fns";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router";
import Modal from "../../ui/Modal";
import EditProjectForm from "./EditProjectForm";
import { useDeleteProject } from "./useDeleteProject";

export default function ProjectItem({ project }) {
  const { deleteProject, isPending } = useDeleteProject();
  const navigate = useNavigate();

  // const handleEditClick = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   console.log("edit clicked for project:", project.id);
  // };

  return (
    <div
      onClick={() => navigate(`/projects/${project.id}`)}
      className="bg-neutral-200 relative p-4 rounded-md text-lg cursor-pointer transition-all duration-300 hover:bg-neutral-950 hover:text-white group"
    >
      <div className="font-bold text-xl">{project.title}</div>
      <div className="mb-2">{project.description}</div>
      <div>
        Created: {format(new Date(project.createdAt), "EEE, MMM dd yyyy")}
      </div>
      <div>{project.tasks.length} tasks</div>

      <div
        className="absolute z-50 right-2 bottom-2 flex items-center gap-1"
        onClick={(e) => e.stopPropagation()}
      >
        <Modal>
          <Modal.Open opens={`edit-project-${project.id}`}>
            <button className="z-50 relative pointer-events-auto cursor-pointer disabled:cursor-not-allowed">
              <BiEdit className="text-2xl text-neutral-800 group-hover:text-neutral-100 hover:text-blue-400 transition-all duration-150" />
            </button>
          </Modal.Open>
          <Modal.Window name={`edit-project-${project.id}`}>
            <EditProjectForm project={project} />
          </Modal.Window>
        </Modal>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteProject(project.id);
          }}
          disabled={isPending}
          className="z-50 relative pointer-events-auto cursor-pointer disabled:cursor-not-allowed"
        >
          <BiTrash className="text-2xl text-neutral-800 group-hover:text-neutral-100 hover:text-red-400 transition-all duration-150" />
        </button>
      </div>
    </div>
  );
}
