import Header from "../Header";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import entrenamientosImg from "../../assets/entrenamientos2.png";
import eventosImg from "../../assets/eventos.png";
import Card from "./Card";
import RespnosiveCards from "./RespnosiveCards";

function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="relative flex w-full h-screen items-center z-20 ">
      <Header />
      <div className=" flex  flex-col bg-[#fff] bg-opacity-90  z-20 xl:w-[55%] md:w-[90%] w-[95%] items-center justify-center gap-10 py-5 mx-auto xl:mt-[3%] rounded-3xl">
        <div
          className="flex relative   bg-[#000] bg-opacity-15 backdrop-blur-sm z-20 xl:w-[90%] md:w-[90%] w-[95%] px-3 items-center justify-center gap-16 py-20 m-auto rounded-3xl"
          data-aos="fade"
          data-aos-duration="2000"
          data-aos-delay="600"
        >
          <div className="xl:flex md:flex hidden w-[80%] mx-auto items-center justify-around">
            <Card
              text="Entrenamientos"
              buttonHref="/entrenamientos"
              img={entrenamientosImg}
            />
            <Card text="Eventos" buttonHref="/eventos" img={eventosImg} />
          </div>
          <div className="xl:hidden md:hidden w-[70%] flex items-center justify-center">
            <RespnosiveCards />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
