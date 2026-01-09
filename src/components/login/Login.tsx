import logo from "/assets/gevpLogo.png";
import InputText from "../../commons/InputText";
import InputPsw from "../../commons/InputPsw";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { login } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { useUserStoreLocalStorage } from "../../store/userStore";
import Button4 from "../../commons/Button4";
import BackButton from "../../commons/BackButton";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const res = await login(userData.username, userData.password);
      if (res == "invalid password") {
        setIsLoading(false);
        Report.failure(
          "Error al iniciar sesión",
          "Contraseña incorrecta",
          "Ok",
          () => {
            setUserData({ username: "", password: "" });
          }
        );
      } else if (res && res.role) {
        setIsLoading(false);
        loginState(res.role);
        navigate("/inicio");
      }
    } catch (error) {
      if (!userData.username || !userData.password) {
        Report.failure(
          "Error al iniciar sesión",
          "Debe completar todos los campos",
          "Ok"
        );
      }

      setIsLoading(false);
      throw error;
    }
  };

  return (
    <div className="flex w-full h-screen items-center justify-center z-20">
      <div className="flex relative flex-col bg-[#fff] bg-opacity-90  z-20 xl:w-[40%] md:w-[60%] w-[90%] items-center gap-10 py-8 m-auto rounded-3xl">
        <div
          className="flex relative flex-col bg-[#000] bg-opacity-15 backdrop-blur-sm z-20 xl:w-[90%] md:w-[60%] w-[90%] px-3 items-center gap-10 py-8 m-auto rounded-3xl xl:border-2 border border-gray-600"
          data-aos="fade"
          data-aos-duration="2200"
          data-aos-delay="200"
        >
          <div
            data-aos="fade"
            data-aos-duration="2000"
            data-aos-delay="600"
            className="relative flex ml-0 w-full px-5"
          >
            <BackButton />
          </div>
          <div data-aos="fade" data-aos-duration="2000" data-aos-delay="400">
            <img
              src={logo}
              className="xlL:w-[15%] md:w-[20%] w-[25%] flex mx-auto"
            />
          </div>

          <form className="xl:w-[60%] flex flex-col gap-6">
            <div data-aos="fade" data-aos-duration="2000" data-aos-delay="600">
              <InputText
                placeholder="Usuario"
                width="full"
                onChange={handleChange}
                value={userData.username}
                name="username"
              />
            </div>
            <div data-aos="fade" data-aos-duration="2000" data-aos-delay="600">
              <InputPsw
                onChange={handleChange}
                value={userData.password}
                name="password"
              />
            </div>
          </form>

          <button
            data-aos="fade"
            data-aos-duration="2000"
            data-aos-delay="700"
            disabled={isLoading}
          >
            <Button4 text="Iniciar Sesión" onClick={handleSubmit} />
          </button>
          {isLoading && (
            <div className="loading-spinner">
              <ClipLoader color="#4D5061" loading={isLoading} size={50} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
