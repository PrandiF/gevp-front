import { useNavigate } from "react-router-dom";

type CardProps = {
  img: string;
  buttonText: string;
  buttonHref: string;
};

function Card({ img, buttonText, buttonHref }: CardProps) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(`${buttonHref}`)}
      className="relative w-full xl:h-full md:h-[50%] rounded-lg shadow-lg overflow-hidden bg-transparent transition-transform duration-500"
    >
      <img
        src={img}
        className="w-full h-full object-cover z-0 rounded-lg"
        alt="imagen"
      />
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center">
        <div
          className="z-30 bg-button1-gradient py-1 w-[150px] flex items-center justify-center shadow-lg rounded-3xl cursor-pointer hover:brightness-95"

        >{buttonText}</div>
      </div>
    </button>
  );
}

export default Card;
