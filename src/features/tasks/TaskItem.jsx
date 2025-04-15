import { useDraggable } from "@dnd-kit/core";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { BiEdit, BiTrash } from "react-icons/bi";
import Modal from "../../ui/Modal";
import { useUpdateProject } from "../projects/useUpdateProject";
import EditTaskForm from "./EditTaskForm";

export default function TaskItem({ project, task }) {
  const { updateProject, isPending } = useUpdateProject();
  const queryClient = useQueryClient();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const styles = transform
    ? {
        transform: `translate(${transform.x}px , ${transform.y}px)`,
        zIndex: 999,
      }
    : undefined;

  function handleEditTask(e) {
    e.stopPropagation();
    console.log(task);
    console.log(project);
    console.log("Edit task:", task.id);
  }

  function handleDeleteTask(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Delete task:", task.id);

    const newProject = {
      ...project,
      tasks: [...project.tasks.filter((t) => t.id !== task.id)],
    };

    updateProject(
      { updatedProject: { ...newProject }, id: project.id },
      {
        onSuccess: () => {
          toast.success("Task deleted successfully!");
          queryClient.invalidateQueries({
            queryKey: ["project", project.id],
          });
          queryClient.setQueryData(["project", String(project.id)], newProject);
        },
      }
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={styles}
      className={`cursor-grab relative rounded-md p-4 shadow-sm hover:shadow-md ${
        task.status === "DONE"
          ? "bg-green-800"
          : task.status === "IN_PROGRESS"
          ? "bg-neutral-700"
          : "bg-amber-800"
      }`}
    >
      <div
        {...listeners}
        {...attributes}
        className="absolute top-0 left-0 w-full h-full"
      />

      <div className="absolute z-50 top-1 right-1 flex items-center gap-1">
        <Modal>
          <Modal.Open opens={`${task.id}`}>
            <button
              onClick={handleEditTask}
              className="z-50 relative pointer-events-auto"
            >
              <BiEdit className="text-2xl text-neutral-50 cursor-pointer transition-all duration-150 hover:text-cyan-400" />
            </button>
          </Modal.Open>
          <Modal.Window name={`${task.id}`}>
            <EditTaskForm project={project} task={task} />
          </Modal.Window>
        </Modal>
        <button
          disabled={isPending}
          onClick={handleDeleteTask}
          className="z-50 relative pointer-events-auto cursor-pointer disabled:cursor-not-allowed"
        >
          <BiTrash className="text-2xl text-neutral-50 hover:text-red-400 transition-all duration-150 " />
        </button>
      </div>

      <div className="relative z-20 pointer-events-none">
        <h3 className="font-medium text-neutral-100">{task.title}</h3>
        <p className="my-2 text-md text-neutral-200">{task.description}</p>
        {task.assignee && (
          <p className="text-neutral-100 text-md">Assignee: {task.assignee}</p>
        )}
        <p className="text-neutral-100 text-md mt-2">
          Due Date: {format(new Date(task.dueDate), "EEE, MMM dd yyyy")}
        </p>
      </div>
    </div>
  );
}
