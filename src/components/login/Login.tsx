import logo from "../../assets/gevpLogo.png"
import InputText from "../../commons/InputText";
import InputPsw from "../../commons/InputPsw";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { login } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { useUserStoreLocalStorage } from "../../store/userStore";
import Button4 from "../../commons/Button4";
function Login() {
  const navigate = useNavigate();
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
    try {
      const res = await login(userData.username, userData.password);
      if (res == "User has been logged") {
        loginState();
        navigate("/inicio");
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="flex w-full h-screen items-center justify-center z-20">
      <div className="flex relative flex-col bg-[#fff] bg-opacity-90  z-20 xl:w-[40%] md:w-[60%] w-[90%] items-center gap-10 py-8 m-auto rounded-3xl">
        <div
          className="flex relative flex-col bg-[#000] bg-opacity-15 backdrop-blur-sm z-20 xl:w-[90%] md:w-[60%] w-[90%] px-3 items-center gap-10 py-8 m-auto rounded-3xl"
          data-aos="fade"
          data-aos-duration="2200"
          data-aos-delay="200"
        >
          <div data-aos="fade" data-aos-duration="2000" data-aos-delay="400">
            <img src={logo} className="xlL:w-[15%] md:w-[20%] w-[25%] flex mx-auto"/>
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
          <button data-aos="fade" data-aos-duration="2000" data-aos-delay="700">
            <Button4 text="Iniciar Sesión" onClick={handleSubmit} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
