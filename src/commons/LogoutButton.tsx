import { logout } from "../services/user.service";
import { useNavigate } from "react-router-dom";
import { useUserStoreLocalStorage } from "../store/userStore";
import { FiLogOut } from "react-icons/fi";
function LogoutButton() {
  const navigate = useNavigate();
  const { logoutState } = useUserStoreLocalStorage();
  const handleLogout = async () => {
    try {
      await logout(); // ⬅ no necesitamos comparar con res
      logoutState(); // limpiamos el store y localStorage
      navigate("/"); // redirigimos al login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Report.failure("Error", "No se pudo cerrar sesión", "Ok");
    }
  };
  return (
    <button
      onClick={handleLogout}
      title="Cerrar sesión"
      className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-[#43b4ff] to-[#157cbc] text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
    >
      <FiLogOut size={18} />
    </button>
  );
}

export default LogoutButton;
