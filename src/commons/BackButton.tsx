import { FaArrowLeft } from "react-icons/fa";

function BackButton() {
  return (
    <div className="cursor-pointer text-celeste  underline flex gap-0.5 items-center" onClick={() => window.history.back()}>
      <FaArrowLeft />
      <p className="xl:text-lg md:text-lg text-sm font-semibold">Atrás</p>
    </div>
  );
}

export default BackButton;
