import { DndContext } from "@dnd-kit/core";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../../ui/Spinner";
import { useProject } from "../projects/useProject";
import { useUpdateProject } from "../projects/useUpdateProject";
import Column from "./Column";

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
  const queryClient = useQueryClient();

  useEffect(() => {
    if (project?.tasks) {
      setTasks(project.tasks);
    }
  }, [id, project?.tasks]);

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
      <h1 className="text-3xl text-primary-300 text-center font-semibold">
        {project.title}
      </h1>
      <div className="grid grid-cols-3 gap-8 items-start py-8">
        <DndContext onDragEnd={onDragEnd}>
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
