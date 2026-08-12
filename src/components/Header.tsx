import logo from "../assets/gevpLogo.webp";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutButton from "../commons/LogoutButton";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { useEffect, useState } from "react";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

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
    <header className="fixed top-3 left-1/2 z-50 w-[95%] max-w-7xl -translate-x-1/2 md:top-5 md:w-[90%]">
      <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-black/25 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,.25)] backdrop-blur-2xl transition-all duration-300">
        {/* Logo */}
        <button
          onClick={() => navigate("/inicio")}
          className="flex items-center gap-3 transition hover:opacity-90"
        >
          <img
            src={logo}
            alt="GEVP"
            className="h-10 w-10 object-contain md:h-14 md:w-14"
          />

          <div className="hidden md:flex flex-col text-left">
            <span className="text-lg font-bold tracking-tight text-white">
              GEVP
            </span>

            <span className="text-xs text-white/60">Gestión Deportiva</span>
          </div>
        </button>

        <div className="mx-6 hidden h-8 w-px bg-white/15 md:block" />

        {/* Desktop */}
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`rounded-xl px-5 py-2.5 font-medium transition-all duration-200 ${
                  active
                    ? "border border-white bg-white text-[#157cbc] shadow-lg"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <div className="ml-3">
            <LogoutButton />
          </div>
        </nav>

        {/* Mobile */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition-all duration-300 hover:bg-white/10 md:hidden"
        >
          {menuOpen ? <HiXMark size={28} /> : <HiBars3 size={28} />}
        </button>
      </div>
      <div
        className={`w-full absolute right-0 top-full mt-3 md:hidden transition-all duration-300 ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="w-full overflow-hidden rounded-2xl border border-white/15 bg-black/25 p-3 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-2xl">
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`mb-2 w-full rounded-xl px-4 py-3 text-left font-medium transition ${
                  active
                    ? "bg-white text-[#157cbc]"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <div className="mt-2 border-t border-white/10 pt-3">
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
