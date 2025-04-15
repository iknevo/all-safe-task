import Projects from "../features/projects/Projects";
import ProjectsAside from "../features/projects/ProjectsAside";
import { useProjects } from "../features/projects/useProjects";
import Spinner from "../ui/Spinner";

export default function ProjectsPage() {
  const { projects, isLoading } = useProjects();

  if (isLoading) return <Spinner />;

  return (
    <section>
      {/* <ProjectsAside projects={projects} /> */}
      <Projects projects={projects} />
    </section>
  );
}
