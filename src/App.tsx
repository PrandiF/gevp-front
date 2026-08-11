import "./index.css";
import imageBackground from "./assets/fondo7.webp";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/inicio/Home";
import Carga from "./components/carga/Carga";
// import Consulta from "./components/consulta/Consulta";
// import IndividualConsulta from "./components/consulta/IndividualConsulta";
import { useUserStoreLocalStorage } from "./store/userStore";
// import Horarios from "./components/Horarios/Horarios";
// import HorarioDia from "./components/Horarios/HorarioDia";
// import HorarioIndividual from "./components/Horarios/HorarioIndividual";
// import CargaHorario from "./components/Horarios/CargarHorario";
// import HorarioGimnasios from "./components/Horarios/HorarioGimnasios";
// import AuthSelector from "./components/AuthSelector";
import ClubCalendar from "./components/calendar/ClubCalendar";

function App() {
  const isAuthenticated = useUserStoreLocalStorage(
    (state) => state.isAuthenticated,
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageBackground})` }}
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-[#0B3E67]/35" />

      {/* Contenido */}
      <div className="relative z-10 min-h-screen">
        <Router>
          <Routes>
            {isAuthenticated ? (
              <>
                {useUserStoreLocalStorage.getState().role === "admin" && (
                  <Route path="/inicio" element={<Home />} />
                )}

                <Route path="/cargar" element={<Carga />} />
                <Route path="/calendario" element={<ClubCalendar />} />

                <Route
                  path="*"
                  element={
                    useUserStoreLocalStorage.getState().role === "admin" ? (
                      <Navigate to="/inicio" replace />
                    ) : (
                      <Navigate to="/calendario" replace />
                    )
                  }
                />
              </>
            ) : (
              <>
                <Route path="/" element={<Login />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
