import Modal from "../../ui/Modal";
import AddProjectForm from "./AddProjectForm";
import ProjectItem from "./ProjectItem";

export default function Projects({ projects }) {
  return (
    <main className="flex flex-col py-4">
      <div className="flex justify-between items-center mb-8 pr-2">
        <h2 className="text-2xl text-neutral-100 uppercase tracking-wider">
          Your Projects {`( ${projects.length} )`}
        </h2>
        <Modal>
          <Modal.Open opens="add-project">
            <button className="bg-neutral-500 uppercase tracking-widest text-white font-semibold hover:bg-neutral-400 hover:text-neutral-950 transition-all duration-200 rounded-md py-1 px-3 cursor-pointer ">
              add project
            </button>
          </Modal.Open>
          <Modal.Window name="add-project">
            <AddProjectForm />
          </Modal.Window>
        </Modal>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-scroll max-h-[calc(100vh-200px)]">
        {projects.map((project) => (
          <ProjectItem project={project} key={project.id} />
        ))}
      </div>
    </main>
  );
}
