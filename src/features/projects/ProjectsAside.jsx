import { useState } from "react";
import EditProjectForm from "./EditProjectForm";

export default function ProjectsAside({ projects }) {
  // console.log(projects);
  const [openId, setOpenId] = useState(null);
  const [currentProject, setCurrentProject] = useState({});

  function handleOpen(project) {
    setCurrentProject(project);
    setOpenId(project.id !== openId ? project.id : null);
  }
  return (
    <aside>
      <h2 className="text-2xl text-neutral-100 uppercase tracking-wider mb-4">
        Edit Projects
      </h2>
      <ul className="flex flex-col gap-4 overflow-y-auto  max-h-[calc(100vh-210px)]">
        {projects.map((project) => (
          <li
            onClick={() => handleOpen(project)}
            className="bg-neutral-200 cursor-pointer flex flex-col gap-4 py-2 px-4 text-xl rounded-md"
            key={project.id}
          >
            <div className="flex justify-between items-center">
              <span>{project.title}</span>
              <span>
                ( {project.tasks.length && project.tasks.length} ) tasks
              </span>
            </div>
            {openId === project.id && (
              <EditProjectForm project={currentProject} setOpenId={setOpenId} />
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
