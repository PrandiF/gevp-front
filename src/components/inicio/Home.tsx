import Title from "../../commons/Title";
import imgCargar from "../../assets/imagenCargar.png";
import imgConsultar from "../../assets/imagenConsultar.png";
import Card from "./Card";
import RespnosiveCards from "./RespnosiveCards";
import Header from "../Header";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import OptionButton from "../../commons/OptionButton";
function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="relative flex flex-col w-full min-h-screen items-center z-20 ">
      <Header />
      {/* <div className="flex items-center justify-center flex-col gap-16 mx-auto"> */}
      {/* <div
          className="flex text-center"
          data-aos="fade"
          data-aos-duration="2000"
          data-aos-delay="400"
        >
          <Title text="¿Qué operación desea realizar?" />
        </div> */}

      <div className=" flex relative flex-col bg-[#fff] bg-opacity-90  z-20 xl:w-[40%] md:w-[60%] w-[90%] items-center gap-10 py-8 mx-auto xl:mt-[5%] rounded-3xl">
        <div
          className="flex relative flex-col bg-[#000] bg-opacity-15 backdrop-blur-sm z-20 xl:w-[90%] md:w-[60%] w-[90%] px-3 items-center gap-16 py-20 m-auto rounded-3xl"
          data-aos="fade"
          data-aos-duration="2000"
          data-aos-delay="600"
        >
          <OptionButton text="Cargar Evento" url="/cargar" />

          <OptionButton text="Consultar" url="/consultar" />
        </div>
        {/* <div className="xl:hidden md:hidden flex justify-center items-center">
            <RespnosiveCards />
          </div> */}
      </div>
      {/* </div> */}
    </div>
  );
}

export default Home;
