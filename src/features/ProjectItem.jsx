export default function ProjectItem({ project }) {
  return (
    <div>
      <div>{project.title}</div>
      <div>{project.description}</div>
      <div>{project.tasks.length} tasks</div>
      <div></div>
    </div>
  );
}
