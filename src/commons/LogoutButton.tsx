import { logout } from "../services/user.service";
import { useNavigate } from "react-router-dom";
import { useUserStoreLocalStorage } from "../store/userStore";
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
      className="group flex items-center justify-start xl:w-11 w-9  xl:h-11 h-9  bg-button1-gradient rounded-full cursor-pointer relative overflow-hidden transition-all duration-300 shadow-lg hover:brightness-90"
    >
      <div className="flex items-center justify-center w-full transition-all duration-300 ">
        <svg
          className="xl:w-4 w-3.5  xl:h-4 h-3.5 "
          viewBox="0 0 512 512"
          fill="white"
        >
          <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
        </svg>
      </div>
    </button>
  );
}

export default LogoutButton;
