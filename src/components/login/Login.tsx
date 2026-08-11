import logo from "../../assets/gevpLogo.webp";
import InputText from "../../commons/InputText";
import InputPsw from "../../commons/InputPsw";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { login } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { useUserStoreLocalStorage } from "../../store/userStore";
import BackButton from "../../commons/BackButton";
import { Report } from "notiflix";
import { ClipLoader } from "react-spinners";
import ButtonSubmit from "../../commons/ButtonSubmit";
import Card from "../../commons/Card";
import { FaLock, FaShieldAlt } from "react-icons/fa";
function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    AOS.init();
  }, []);

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const { loginState } = useUserStoreLocalStorage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userData.username || !userData.password) {
      Report.failure(
        "Error al iniciar sesión",
        "Debe completar todos los campos",
        "Ok",
      );
      return;
    }

    setIsLoading(true);

    setTimeout(async () => {
      try {
        const res = await login(userData.username, userData.password);

        if (res === "invalid password") {
          Report.failure(
            "Error al iniciar sesión",
            "Contraseña incorrecta",
            "Ok",
            () => setUserData({ username: "", password: "" }),
          );
        } else if (res?.role) {
          loginState(res.role, res.deporte);
          navigate("/inicio");
        }
      } catch (error) {
        Report.failure("Error", "Usuario o contraseña incorrectos", "Ok");
      } finally {
        setIsLoading(false);
      }
    }, 1200); // ⏱️ delay “iniciando sesión…”
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card
        className="relative w-full max-w-xl p-10"
        data-aos="fade-up"
        data-aos-duration="700"
      >
        <div className="mb-8">
          <BackButton />
        </div>

        <img src={logo} alt="GEVP" className="mx-auto mb-6 w-32" />

        <h1 className="text-center text-3xl font-bold text-gray-800 leading-tight">
          Sistema de Gestión Deportiva
        </h1>

        <p className="mt-2 mb-8 text-center text-gray-500">
          Ingresá con tu usuario para administrar entrenamientos, partidos y
          calendarios.
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <InputText
            placeholder="Usuario"
            width="full"
            onChange={handleChange}
            value={userData.username}
            name="username"
          />

          <InputPsw
            onChange={handleChange}
            value={userData.password}
            name="password"
          />

          <div className="mt-2 flex mx-auto">
            <ButtonSubmit
              text="Iniciar Sesión"
              submit
              icon={<FaLock size={14} />}
            />
          </div>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
          <FaShieldAlt className="text-gray-400" />
          <span>Acceso seguro y confidencial</span>
        </div>

        {isLoading && (
          <div className="mt-6 flex flex-col items-center gap-3 animate-fadeIn">
            <ClipLoader color="#1d91d9" loading={isLoading} size={32} />

            <p className="text-sm font-medium text-gray-500">
              Iniciando sesión...
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}

export default Login;
