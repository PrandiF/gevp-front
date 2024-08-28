import { useNavigate } from "react-router-dom";

type AddButtonProps = {
  text: string;
  url: string;
};

function AddButton({ text, url }: AddButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`${url}`)}
      className="flex justify-center items-center px-1 gap-3 xl:w-[200px] cursor-pointer rounded-3xl shadow-2xl text-white  bg-button1-gradient hover:brightness-95 duration-200 ease-in-out transition-all"
    >
      <svg className="w-5 fill-white" viewBox="0 0 15 15">
        <svg
          className="w-6 h-6"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
      </svg>
      <p className="py-1.5 text-sm">{text}</p>
    </button>
  );
}

export default AddButton;
