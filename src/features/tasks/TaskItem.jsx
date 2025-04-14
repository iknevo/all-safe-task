import { useDraggable } from "@dnd-kit/core";
import { format } from "date-fns";

export default function TaskItem({ task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const styles = transform
    ? {
        transform: `translate(${transform.x}px , ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={styles}
      className={`cursor-grab rounded-md p-4 shadow-sm hover:shadow-md ${
        task.status === "DONE"
          ? "bg-green-800"
          : task.status === "IN_PROGRESS"
          ? "bg-neutral-700"
          : "bg-amber-800"
      }`}
    >
      <h3 className="font-medium text-neutral-100">{task.title}</h3>
      <p className="my-2 text-md text-neutral-200">{task.description}</p>
      {task.assignee && (
        <p className="text-neutral-100 text-md">Assignee: {task.assignee}</p>
      )}
      <p className="text-neutral-100 text-md mt-2">
        Due Date: {format(new Date(task.dueDate), "EEE, MMM dd yyyy")}
      </p>
    </div>
  );
}
