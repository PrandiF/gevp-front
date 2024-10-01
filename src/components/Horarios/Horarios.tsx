import BackButton from "../../commons/BackButton";
import Title from "../../commons/Title";
import Header from "../Header";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AgendaGimnasios from "./AgendaGimnasios";
import AddButton from "../../commons/AddButton";

function Horarios() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className=" flex w-full items-start z-20 py-[8%]">
      <Header />
      <div className="flex w-full h-full items-start flex-col gap-8 xl:pt-0  pt-[5%]">
        <div className="flex relative flex-col bg-[#fff] bg-opacity-90 z-20 w-[90%] items-center gap-10 xl:py-8 py-3 mx-auto xl:mt-[5%] mt-[15%]   rounded-3xl">
          <div className="flex relative flex-col bg-[#000] bg-opacity-15 backdrop-blur-sm z-20 xl:w-[95%]  w-[95%] xl:px-4  items-center gap-10 xl:py-8 py-5 m-auto rounded-3xl xl:border-2 border border-gray-600">
            <div
              className="flex mr-auto xl:pl-0 pl-5"
              data-aos="fade"
              data-aos-duration="2000"
              data-aos-delay="400"
            >
              <BackButton />
            </div>
            <div
              className="flex text-center"
              data-aos="fade"
              data-aos-duration="2000"
              data-aos-delay="400"
            >
              <Title text="Actividad Deportiva" />
            </div>
            <div className="mt-[-10px] mb-[-10px]">
              <AddButton text="Nueva Actividad" url="/entrenamientos/cargar" />
            </div>

            <div className="flex flex-col items-center px-4 justify-center w-full rounded-lg mb-3">
              <AgendaGimnasios />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Horarios;
