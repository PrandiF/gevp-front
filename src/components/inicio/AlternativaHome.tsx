import entrenamientos from "../../assets/entrenamientos3.webp";
import eventos from "../../assets/eventos2.webp";
import { useUserStoreLocalStorage } from "../../store/userStore";
import { useEffect } from "react";
import { HiOutlineCalendarDays, HiOutlinePlusCircle } from "react-icons/hi2";
import Card from "./Card";

function AlternativaHome() {
  const { role } = useUserStoreLocalStorage();

  useEffect(() => {
    console.log(role);
  }, []);

  return (
    <div className="flex h-screen w-full flex-col xl:flex-row pt-28 pb-10 md:pb-0 md:pt-0">
      <Card
        image={entrenamientos}
        title="Calendario"
        description="Consultá entrenamientos, partidos y la disponibilidad de todos los espacios deportivos."
        buttonHref="/calendario"
        buttonText="Ingresar"
        icon={<HiOutlineCalendarDays />}
        overlayColor="bg-[#0B5D89]/55"
      />

      <Card
        image={eventos}
        title="Nueva actividad"
        description="Creá entrenamientos, partidos y nuevas actividades para mantener actualizado el calendario."
        buttonHref="/cargar"
        buttonText="Crear actividad"
        icon={<HiOutlinePlusCircle />}
        overlayColor="bg-black/50"
      />
    </div>
  );
}

export default AlternativaHome;
