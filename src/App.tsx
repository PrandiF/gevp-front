import "./index.css";
import imageBackground from "./assets/fondo2.jpg";
import imageBackgroundResponsive from "./assets/fondo1.jpg";
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

function App() {
  const { isAuthenticated } = useUserStoreLocalStorage();
  return (
    <Router>
      <div className="min-h-screen w-full font-roboto scroll-smooth flex flex-col font-raleway">
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

        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Navigate to="/inicio" replace />} />
              <Route path="/inicio" element={<Home />} />
              <Route path="/cargar" element={<Carga />} />
              <Route path="/consultar" element={<Consulta />} />
              <Route
                path="/consultar/individual/:id"
                element={<IndividualConsulta />}
              />
            </>
          ) : (
            <Route path="/" element={<Login />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
