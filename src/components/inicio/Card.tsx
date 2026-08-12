import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

type CardProps = {
  image: string;
  title: string;
  description: string;
  buttonHref: string;
  buttonText: string;
  icon?: React.ReactNode;
  overlayColor?: string;
};

function Card({
  image,
  title,
  description,
  buttonHref,
  buttonText,
  icon,
  overlayColor = "bg-[#0b3e67]/55",
}: CardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(buttonHref)}
      className="group relative h-[50vh] md:h-[50vh] xl:h-full xl:w-1/2 w-[90%] overflow-hidden cursor-pointer mx-auto rounded-xl md:rounded-none"
    >
      {/* Imagen */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 ${overlayColor} transition-all duration-500 md:group-hover:bg-black/55`}
      />

      {/* Contenido */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-10 md:justify-center md:pb-0 px-6 text-center sm:px-10">
        {icon && (
          <div className="mb-5 text-4xl text-white drop-shadow-lg transition-all duration-300 md:mb-8 md:text-7xl md:group-hover:-translate-y-2">
            {icon}
          </div>
        )}

        <h2 className="text-3xl font-bold tracking-tight text-white drop-shadow-lg transition-all duration-300 md:text-4xl xl:text-5xl md:group-hover:-translate-y-2">
          {title}
        </h2>

        <p className="mt-4 max-w-sm text-base leading-7 text-white/90 transition-all duration-300 md:mt-6 md:max-w-md xl:text-lg md:group-hover:-translate-y-2">
          {description}
        </p>

        <div className="mt-10 hidden md:flex items-center gap-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-6 py-3 text-white font-semibold opacity-0 translate-y-6 transition-all duration-300 md:group-hover:translate-y-0 group-hover:opacity-100">
          <span>{buttonText}</span>
          <FaArrowRight className="text-sm" />
        </div>
      </div>
    </div>
  );
}

export default Card;
