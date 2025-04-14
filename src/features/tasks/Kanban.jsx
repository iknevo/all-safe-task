import { DndContext } from "@dnd-kit/core";
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

  useEffect(() => {
    if (project?.tasks) {
      setTasks(project.tasks);
    }
  }, [project?.tasks]);

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
  }

  if (isLoading) return <Spinner />;
  return (
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
  );
}
