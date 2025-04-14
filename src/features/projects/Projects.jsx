import ProjectItem from "./ProjectItem";

export default function Projects({ projects }) {
  return (
    <main className="flex flex-col">
      <h2 className="text-2xl text-primary-100 uppercase tracking-wider mb-4">
        Your Projects {`( ${projects.length} )`}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto h-[calc(100vh-200px)]">
        {projects.map((project) => (
          <ProjectItem project={project} key={project.id} />
        ))}
      </div>
    </main>
  );
}
