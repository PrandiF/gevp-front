import { useNavigate } from "react-router-dom";
import entrenamientos from "/assets/entrenamientos3.jpg";
import eventos from "/assets/eventos2.jpg";

function AlternativaHome() {
  const navigate = useNavigate();
  return (
    <div className="relative flex xl:flex-row  flex-col w-full h-screen">
      <div
        className="relative xl:w-1/2  h-full overflow-hidden cursor-pointer hover:brightness-75 transition-all duration-300"
        onClick={() => navigate("/entrenamientos")}
      >
        <p
          className="xl:text-[50px] md:text-[40px] text-[35px] font-bold  absolute inset-0 flex items-center justify-center z-10 text-white hover:scale-110 transition-all duration-300"
          style={{ textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)" }}
        >
          Entrenamientos
        </p>
        <img
          src={entrenamientos}
          className="flex w-full xl:h-screen h-full object-cover"
          style={{
            filter: "brightness(0.5) sepia(1) hue-rotate(180deg) saturate(2)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#2c7a9e",
            mixBlendMode: "color",
            opacity: 0.5,
          }}
        ></div>
      </div>

      <div
        className="relative xl:w-1/2 h-full overflow-hidden cursor-pointer hover:brightness-75 transition-all duration-300"
        onClick={() => navigate("/eventos")}
      >
        <p
          className="xl:text-[50px] md:text-[40px] text-[35px] font-bold  absolute inset-0 flex items-center justify-center z-10 text-white hover:scale-110 transition-all duration-300"
          style={{ textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)" }}
        >
          Eventos
        </p>
        <img
          src={eventos}
          className="flex w-full xl:h-screen h-full object-cover"
          style={{
            filter: "brightness(0.3) sepia(1) hue-rotate(180deg) saturate(1)",
          }}
        />
      </div>
    </div>
  );
}

export default AlternativaHome;
