import "./index.css";
import imageBackground from "/assets/fondo7.jpg";
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
import HorarioGimnasios from "./components/Horarios/HorarioGimnasios";

function App() {
  const { isAuthenticated } = useUserStoreLocalStorage();
  return (
    <div className="relative min-h-screen w-full font-roboto scroll-smooth flex flex-col font-montserrat">
      <img
        src={imageBackground}
        alt="fondo"
        className="flex absolute  top-0 left-0 inset-0 w-screen h-full object-cover"
      />
      <Router>
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
              <Route
                path="/entrenamientos/:gimnasio"
                element={<HorarioGimnasios />}
              />
              <Route
                path="/entrenamientos/:gimnasio/:dia"
                element={<HorarioDia />}
              />
              <Route
                path="/entrenamientos/individual/:id"
                element={<HorarioIndividual />}
              />
            </>
          ) : (
            <Route path="/" element={<Login />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
