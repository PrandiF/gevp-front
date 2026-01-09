import { useNavigate } from "react-router-dom";
import { useUserStoreLocalStorage } from "../store/userStore";
import { socioLogin } from "../services/user.service";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function AuthSelector() {
  const navigate = useNavigate();
  const { loginState } = useUserStoreLocalStorage();

  useEffect(() => {
    AOS.init();
  }, []);

  const handleSocio = async () => {
    try {
      await socioLogin();
      loginState("socio");
      navigate("/inicio");
    } catch (error) {
      console.error("Error al entrar como socio:", error);
    }
  };

  const handleEmpleado = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col  items-center justify-center h-screen gap-10 relative">
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2
          className="text-white xl:text-5xl text-3xl"
          data-aos="fade"
          data-aos-delay="300"
          data-aos-duration="2800"
        >
          ¡Bienvenido a GEVP!
        </h2>
        <p
          className="text-white xl:text-2xl text-xl"
          data-aos="fade"
          data-aos-delay="400"
          data-aos-duration="2800"
        >
          Seleccioná una opción para ingresar
        </p>
      </div>

      <div
        className="flex gap-6"
        data-aos="fade"
        data-aos-delay="600"
        data-aos-duration="2800"
      >
        <button
          onClick={() => handleSocio()}
          className="bg-white text-blue-500 xl:w-[150px] w-[120px] xl:py-4 py-3 rounded-lg shadow-md z-9999 font-bold md:text-lg text-base hover:scale-105 duration-300"
        >
          Socio
        </button>
        <button
          onClick={() => handleEmpleado()}
          className="bg-blue-500 text-white xl:w-[150px] w-[120px] xl:py-4 py-3 rounded-lg shadow-md z-9999 font-bold md:text-lg text-base hover:scale-105 duration-300"
        >
          Empleado
        </button>
      </div>
    </div>
  );
}

export default AuthSelector;
