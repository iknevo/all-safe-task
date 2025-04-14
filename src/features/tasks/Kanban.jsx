import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import Column from "./Column";

const columns = [
  { id: "TODO", title: "To-Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

const initialTasks = [
  { id: 1, status: "TODO", description: "task 1" },
  { id: 2, status: "DONE", description: "task 2" },
  { id: 3, status: "IN_PROGRESS", description: "task 3" },
  { id: 4, status: "DONE", description: "task 4" },
  { id: 5, status: "TODO", description: "task 5" },
];

export default function Kanban() {
  const [tasks, setTasks] = useState(initialTasks);

  function onDragEnd(event) {
    const { active, over } = event;
    // not over something that is dropable
    if (!over) return;
    // the currently dragged item
    const taskId = active.id;
    // col we are moving into
    const newStatus = over.id;

    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }

  return (
    <div className="grid grid-cols-3 gap-8">
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
