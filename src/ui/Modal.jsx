import { cloneElement, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useSearchParams } from "react-router";
import { useOutsideClick } from "../hooks/useOutsideClick";

const ModalContext = createContext();

function Modal({ children }) {
  // const [openName, setOpenName] = useState("");

  // const close = () => setOpenName("");
  // const open = setOpenName;
  const [searchParams, setSearchParams] = useSearchParams();
  const openName = searchParams.get("modal") || "";

  const close = () =>
    setSearchParams((prev) => {
      prev.delete("modal");
    });

  const open = (name) => setSearchParams({ modal: name });

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: windowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(windowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close, false);

  if (name !== openName) return null;
  return createPortal(
    <div className="fixed top-0 left-0 z-30 h-dvh w-full bg-neutral-800/5  backdrop-blur-xs transition-all duration-500">
      <div
        className="fixed top-1/2 left-1/2 -translate-1/2 rounded-lg bg-neutral-200 p-10 transition-all duration-500"
        ref={ref}
      >
        <button
          className="absolute top-1 right-1 cursor-pointer rounded-lg border-none bg-none p-2 transition-all duration-200 hover:scale-110"
          onClick={close}
        >
          <HiXMark className="text-3xl text-gray-500 transition-all duration-200 hover:text-red-500" />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
