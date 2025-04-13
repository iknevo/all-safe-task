import Spinner from "../ui/Spinner";
import ProjectItem from "./ProjectItem";
import { useProjects } from "./useProjects";

export default function Projects() {
  const { projects, isLoading } = useProjects();
  if (isLoading) return <Spinner />;
  if (!projects.length)
    return (
      <div>
        <h1 className="text-center text-2xl text-white py-20 font-semibold">
          Start By Adding a Project
        </h1>
      </div>
    );
  return (
    <section>
      {projects.map((project) => (
        <ProjectItem project={project} key={project.id} />
      ))}
    </section>
  );
}
