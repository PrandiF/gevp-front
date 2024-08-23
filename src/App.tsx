import "./index.css";
// import imageBackground from "./assets/fondo2.jpg";
// import imageBackgroundResponsive from "./assets/fondo1.jpg";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/inicio/Home";
import Carga from "./components/carga/Carga";
import Consulta from "./components/consulta/Consulta";
import IndividualConsulta from "./components/consulta/IndividualConsulta";
import { useUserStoreLocalStorage } from "./store/userStore";
import Horarios from "./components/Horarios/Horarios";
import HorarioDia from "./components/Horarios/HorarioDia";
import HorarioIndividual from "./components/Horarios/HorarioIndividual";
import CargaHorario from "./components/Horarios/CargarHorario";

function App() {
  const { isAuthenticated } = useUserStoreLocalStorage();
  return (
    <Router>
      <div className=" relative h-full w-full bg-black font-montserrat">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute left-0 right-0 top-[-10%] xl:h-[800px] w-[900px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>

        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Navigate to="/inicio" replace />} />
              <Route path="/inicio" element={<Home />} />
              <Route path="/eventos/cargar" element={<Carga />} />
              <Route path="/eventos" element={<Consulta />} />
              <Route
                path="/eventos/individual/:id"
                element={<IndividualConsulta />}
              />
              <Route path="/entrenamientos" element={<Horarios />} />
              <Route path="/entrenamientos/cargar" element={<CargaHorario />} />
              <Route path="/entrenamientos/:dia" element={<HorarioDia />} />
              <Route
                path="/entrenamientos/individual/:id"
                element={<HorarioIndividual />}
              />
            </>
          ) : (
            <Route path="/" element={<Login />} />
          )}
        </Routes>
      </div>

      {/* <div className="min-h-screen w-full font-roboto scroll-smooth flex flex-col font-IBM">
        <img
          src={imageBackground}
          alt="fondo"
          className="xl:flex absolute md:flex hidden top-0 left-0 inset-0 w-screen h-screen object-cover"
        />

        <img
          src={imageBackgroundResponsive}
          alt="fondo"
          className="xl:hidden md:hidden flex absolute top-0 left-0 inset-0 w-screen h-screen object-cover"
        />
      </div> */}
    </Router>
  );
}

export default App;
