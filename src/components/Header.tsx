import logo from "../assets/gevpLogo.webp";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import LogoutButton from "../commons/LogoutButton";
// import { useUserStoreLocalStorage } from "../store/userStore";

function Header() {
  const navigate = useNavigate();
  // const { role } = useUserStoreLocalStorage();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full py-4 xl:px-16 md:px-8 px-3 z-40 flex items-center justify-between xl:gap-0 md:gap-2 gap-3 bg-transparent xl:mb-0 mb-12">
      <button
        data-aos="fade"
        data-aos-duration="2000"
        data-aos-delay="200"
        onClick={() => navigate("/inicio")}
      >
        <img
          src={logo}
          className="h-16 md:h-20 xl:h-24  w-auto object-contain"
        />
      </button>

      <div className="flex items-center gap-8 xl:text-xl md:text-base text-sm text-white">
        {/* <button
          className="cursor-pointer hover:underline"
          data-aos="fade"
          data-aos-duration="2000"
          data-aos-delay="300"
          onClick={() => navigate("/inicio")}
        >
          Inicio
        </button> */}
        <button
          className="cursor-pointer hover:underline"
          data-aos="fade"
          data-aos-duration="2000"
          data-aos-delay="400"
          onClick={() => navigate("/calendario")}
        >
          Calendario
        </button>
        <button
          className="cursor-pointer hover:underline xl:text-start text-center"
          data-aos="fade"
          data-aos-duration="2000"
          data-aos-delay="500"
          onClick={() => navigate("/cargar")}
        >
          Nueva actividad
        </button>
        <div data-aos="fade" data-aos-duration="2000" data-aos-delay="600">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Header;
