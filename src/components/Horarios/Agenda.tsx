import { useNavigate } from "react-router-dom";

const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

const Agenda = () => {
  const navigate = useNavigate();
  const handleDayClick = (day: string) => {
    navigate(`/entrenamientos/${day}`);
  };

  return (
    <div className="flex w-full xl:flex-row md:flex-row flex-col xl:items-start md:items-start items-center justify-around p-4 gap-1">
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className="xl:w-1/5 md:w-1/6 w-[90%] bg-gray-100 px-4 pb-6 pt-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer flex items-center md:justify-center xl:justify-start"
          onClick={() => handleDayClick(day)}
        >
          <h3 className="xl:text-start md:text-center text-center text-lg text-black font-semibold mb-4">
            {day}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Agenda;
