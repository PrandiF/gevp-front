import logo from "../assets/gevpLogo.png";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import LogoutButton from "../commons/LogoutButton";

function Header() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="relative top-0 left-0 w-full py-4 xl:px-8 md:px-8 px-3 z-40 flex items-center justify-start bg-header-gradient">
      <div className="text-black font-semibold flex mx-auto xl:gap-20 md:gap-12 gap-3 xl:text-[18px] md:text-[18px] text-[12px] font-montserrat">
        <button
          className="cursor-pointer hover:underline"
          data-aos="fade"
          data-aos-duration="2000"
          data-aos-delay="400"
          onClick={() => navigate("/cargar")}
        >
          CARGAR
        </button>
        <button
          data-aos="fade"
          data-aos-duration="2000"
          data-aos-delay="200"
          onClick={() => navigate("/inicio")}
        >
          <img
            src={logo}
            className="xl:w-[100px] md:w-[80px] w-[60px] cursor-pointer"
          />
        </button>
        <button
          className="cursor-pointer hover:underline"
          data-aos="fade"
          data-aos-duration="2000"
          data-aos-delay="500"
          onClick={() => navigate("/consultar")}
        >
          CONSULTAR
        </button>
      </div>
      <div className="absolute right-3" data-aos="fade" data-aos-duration="2000" data-aos-delay="600">
        <LogoutButton />
      </div>
    </div>
  );
}

export default Header;
