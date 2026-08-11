import logo from "../assets/gevpLogo.webp";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutButton from "../commons/LogoutButton";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: "Calendario",
      path: "/calendario",
    },
    {
      label: "Nueva actividad",
      path: "/cargar",
    },
  ];

  return (
    <header
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-7xl"
      // data-aos="fade-down"
    >
      <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-black/25 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] px-7 py-3 transition-all duration-300">
        {/* Logo */}
        <button
          onClick={() => navigate("/inicio")}
          className="flex items-center gap-3 transition-transform duration-300 hover:opacity-90"
        >
          <img src={logo} alt="GEVP" className="w-14 h-14 object-contain" />

          <div className="hidden md:flex flex-col text-left">
            <span className="text-lg font-bold tracking-tight text-white">
              GEVP
            </span>

            <span className="text-xs text-white/60">Gestión Deportiva</span>
          </div>
        </button>
        <div className="h-8 w-px bg-white/15 mx-6" />
        {/* Navegación */}
        <nav className="flex items-center gap-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200
               ${
                 active
                   ? "bg-white text-[#157cbc] border border-white shadow-lg"
                   : "text-white/80 hover:text-white hover:bg-white/10"
               }
                `}
              >
                {item.label}
              </button>
            );
          })}

          <div className="ml-3">
            <LogoutButton />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
