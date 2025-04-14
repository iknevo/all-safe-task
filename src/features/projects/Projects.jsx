import Modal from "../../ui/Modal";
import AddProjectForm from "./AddProjectForm";
import ProjectItem from "./ProjectItem";

export default function Projects({ projects }) {
  return (
    <main className="flex flex-col">
      <div className="flex justify-between items-center mb-4 pr-2">
        <h2 className="text-2xl text-primary-100 uppercase tracking-wider">
          Your Projects {`( ${projects.length} )`}
        </h2>
        <Modal>
          <Modal.Open opens="add-project">
            <button className="bg-primary-500 uppercase tracking-widest text-white font-bold hover:bg-primary-400 hover:text-primary-950 transition-all duration-200 rounded-md py-2 px-4 cursor-pointer ">
              add project
            </button>
          </Modal.Open>
          <Modal.Window name="add-project">
            <AddProjectForm />
          </Modal.Window>
        </Modal>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-2 gap-4 overflow-y-auto max-h-[calc(100vh-200px)]">
        {projects.map((project) => (
          <ProjectItem project={project} key={project.id} />
        ))}
      </div>
    </main>
  );
}
