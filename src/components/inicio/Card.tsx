import { useNavigate } from "react-router-dom";

type CardProps = {
  img?: string;
  text: string;
  buttonHref: string;
};

function Card({ text, buttonHref, img }: CardProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`${buttonHref}`)}
      className="filter grayscale relative xl:w-[230px] xl:h-[350px] md:w-[230px] md:h-[300px] h-[250px] bg-cover bg-center group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl  transition duration-300 ease-in-out cursor-pointer"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
      <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center">
        <h3 className="text-center">
          <p className="text-white text-2xl font-bold text-center mx-8">
            <span className="absolute inset-0"></span>
            {text}
          </p>
        </h3>
      </div>
    </div>
  );
}

export default Card;
