import { ring } from "ldrs";

export default function Spinner() {
  ring.register();
  return (
    <div className="flex justify-center items-center py-20">
      <l-ring
        size="60"
        stroke="7"
        bg-opacity="0"
        speed="2"
        color="var(--color-neutral-400)"
      ></l-ring>
    </div>
  );
}
