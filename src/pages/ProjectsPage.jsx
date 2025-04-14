import Projects from "../features/projects/Projects";
import ProjectsAside from "../features/projects/ProjectsAside";
import { useProjects } from "../features/projects/useProjects";
import Spinner from "../ui/Spinner";

export default function ProjectsPage() {
  const { projects, isLoading } = useProjects();

  if (isLoading) return <Spinner />;

  return (
    <section className="grid grid-cols-[25fr_75fr] gap-8 py-4">
      <ProjectsAside projects={projects} />
      <Projects projects={projects} />
    </section>
  );
}
