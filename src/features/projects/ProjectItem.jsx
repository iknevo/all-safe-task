import { format } from "date-fns";

export default function ProjectItem({ project }) {
  return (
    <div className="bg-primary-200 p-4 rounded-md text-lg">
      <div className="font-bold text-xl">{project.title}</div>
      <div className="mb-2">{project.description}</div>
      <div>
        Created: {format(new Date(project.creationDate), "EEE, MMM dd yyyy")}
      </div>
      <div>{project.tasks.length} tasks</div>
    </div>
  );
}
