import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import { useProject } from "../projects/useProject";
import { useUpdateProject } from "../projects/useUpdateProject";
import Column from "./Column";
import CreateTaskForm from "./CreateTaskForm";
import TaskItem from "./TaskItem";

const columns = [
  { id: "TODO", title: "To-Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

export default function Kanban() {
  const { id } = useParams();
  const { project, isLoading } = useProject(id);
  const { updateProject } = useUpdateProject();
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (project?.tasks) {
      setTasks(project.tasks);
    }
  }, [id, project?.tasks]);

  function onDragStart(event) {
    const { active } = event;
    const taskId = active.id;
    const task = tasks.find((t) => t.id === taskId);
    setActiveTask(task);
  }

  function onDragEnd(event) {
    const { active, over } = event;
    // not over something that is droppable
    if (!over) return;
    // the currently dragged item
    const taskId = active.id;
    // col we are moving into
    const newStatus = over.id;

    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    setTasks(updatedTasks);

    const updatedProject = { ...project, tasks: updatedTasks };
    updateProject({ updatedProject, id: project.id });
    queryClient.setQueryData(["project", id], updatedProject);
  }

  if (isLoading) return <Spinner />;
  return (
    <div className="py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-neutral-300 text-center font-semibold">
          {project.title}
        </h1>
        <Modal>
          <Modal.Open opens="create-task">
            <button className="bg-neutral-700 px-4 py-2 rounded-md font-semibold text-xl text-neutral-100 cursor-pointer">
              Add Task
            </button>
          </Modal.Open>
          <Modal.Window name="create-task">
            <CreateTaskForm project={project} />
          </Modal.Window>
        </Modal>
      </div>
      {project.tasks.length > 0 ? (
        <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <div className="grid grid-cols-3 gap-8 items-start py-8">
            {columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
                project={project}
              />
            ))}
          </div>
          <DragOverlay>
            {activeTask ? (
              <TaskItem project={project} task={activeTask} isDragging={true} />
            ) : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <div className="my-12 py-8 text-neutral-300 flex flex-col items-center gap-8 border-1 border-neutral-500/20 rounded-md">
          <h1 className="text-xl md:text-5xl text-center">
            This project has no tasks, start by adding one!
          </h1>
          {/* <Modal>
            <Modal.Open opens="create-task">
              <button className="bg-neutral-700 px-4 py-2 rounded-md font-semibold text-2xl cursor-pointer">
                Add Task
              </button>
            </Modal.Open>
            <Modal.Window name="create-task">
              <CreateTaskForm project={project} />
            </Modal.Window>
          </Modal> */}
        </div>
      )}
    </div>
  );
}
