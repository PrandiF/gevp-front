import { FaArrowLeft } from "react-icons/fa";

function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="flex items-center gap-2 text-gray-500 hover:text-[#1d91d9] transition-colors duration-200"
    >
      <FaArrowLeft size={14} />
      <span className="text-sm font-medium">Volver</span>
    </button>
  );
}

export default BackButton;
