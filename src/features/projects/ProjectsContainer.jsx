import Spinner from "../../ui/Spinner";
import Projects from "./Projects";
import ProjectsAside from "./ProjectsAside";
import { useProjects } from "./useProjects";

export default function ProjectsContainer() {
  const { projects, isLoading } = useProjects();

  if (isLoading) return <Spinner />;

  return (
    <section className="grid grid-cols-[25fr_75fr] gap-8 py-4">
      <ProjectsAside projects={projects} />
      <Projects projects={projects} />
    </section>
  );
}
