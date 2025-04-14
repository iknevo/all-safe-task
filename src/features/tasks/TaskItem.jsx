import { useDraggable } from "@dnd-kit/core";

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
      className="cursor-grab rounded-md bg-neutral-700 p-4 shadow-sm hover:shadow-md"
    >
      <h3 className="font-medium text-neutral-100">{task.description}</h3>
      <p className="mt-2 text-sm text-neutral-400">{task.description}</p>
    </div>
  );
}
