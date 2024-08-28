import "./index.css";
// import imageBackground from "./assets/fondo6.png";
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
      <div className="relative min-h-screen w-full bg-bg-gradient-blue font-montserrat">
      {/* <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div> */}
      <div className="absolute left-0 right-[-5%] top-[-5%] xl:h-[700px] w-[800px] rounded-full bg-[radial-gradient(circle_300px_at_40%_300px,rgba(150,150,150,0.5),transparent)]"></div>      
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
        {/* <div className="relative min-h-screen w-full font-roboto scroll-smooth flex flex-col font-montserrat">
        <img
          src={imageBackground}
          alt="fondo"
          className="flex absolute  top-0 left-0 inset-0 w-screen h-screen object-cover"
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
