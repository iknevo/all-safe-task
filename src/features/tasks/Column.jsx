import { useDroppable } from "@dnd-kit/core";
import TaskItem from "./TaskItem";

export default function Column({ column, tasks }) {
  // console.log(tasks);
  const { setNodeRef } = useDroppable({ id: column.id });
  return (
    <div className="flex flex-col rounded-md bg-neutral-800 p-4">
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => (
          <TaskItem task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
}
