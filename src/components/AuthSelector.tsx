// import { useNavigate } from "react-router-dom";
// import { useUserStoreLocalStorage } from "../store/userStore";
// import { entrenadorLogin } from "../services/user.service";
// import { useEffect, useState } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { ClipLoader } from "react-spinners";

// function AuthSelector() {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const { loginState } = useUserStoreLocalStorage();

//   const [selectedSport, setSelectedSport] = useState("");

//   useEffect(() => {
//     AOS.init();
//   }, []);

//   /* =========================
//      LOGIN ENTRENADOR
//   ========================= */

//   const handleContinue = async () => {
//     if (!selectedSport) return;

//     setIsLoading(true);

//     try {
//       const res = await entrenadorLogin(selectedSport);

//       if (!res?.role) {
//         alert("Error: no se recibió rol del login");
//         setIsLoading(false);
//         return;
//       }

//       loginState(res.role, selectedSport);

//       // 🔹 Mostramos loader 1 segundo y luego navegamos directo al calendario
//       setTimeout(() => {
//         navigate(res.role === "entrenador" ? "/calendario" : "/inicio", {
//           replace: true,
//         });
//         setIsLoading(false);
//       }, 1000);
//     } catch (error) {
//       alert("Error al iniciar sesión");
//       setIsLoading(false);
//     }
//   };

//   /* =========================
//      DEPTO FISICO
//   ========================= */

//   const handleDepartamentoFisico = () => {
//     setTimeout(() => navigate("/login"), 50);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen gap-10 relative">
//       <div className="flex flex-col gap-2 items-center justify-center">
//         <h2
//           className="text-white xl:text-5xl text-3xl"
//           data-aos="fade"
//           data-aos-delay="300"
//           data-aos-duration="2800"
//         >
//           ¡Bienvenido a GEVP!
//         </h2>

//         <p
//           className="text-white xl:text-2xl text-xl"
//           data-aos="fade"
//           data-aos-delay="400"
//           data-aos-duration="2800"
//         >
//           Seleccioná una opción para ingresar
//         </p>
//       </div>

//       <div
//         className="flex xl:flex-row flex-col gap-6 items-center"
//         data-aos="fade"
//         data-aos-delay="600"
//         data-aos-duration="2800"
//       >
//         <button
//           onClick={handleDepartamentoFisico}
//           className="bg-blue-500 text-white px-8 xl:py-4 py-3 rounded-lg shadow-md font-bold md:text-lg text-base hover:bg-blue-600 duration-300"
//         >
//           Departamento Físico
//         </button>
//         {/* SELECT DEPORTE */}
//         <select
//           value={selectedSport}
//           onChange={(e) => setSelectedSport(e.target.value)}
//           className="bg-white text-blue-500 px-6 xl:py-4 py-3 rounded-lg shadow-md font-bold md:text-lg text-base cursor-pointer hover:bg-slate-200 duration-300"
//         >
//           <option value="">Seleccionar deporte</option>
//           <option value="Básquet">Básquet</option>
//           <option value="Voley">Voley</option>
//           <option value="Cesto">Cesto</option>
//           <option value="Fútbol">Fútbol</option>
//         </select>

//         {/* BOTON CONTINUAR */}

//         {/* DEPTO FISICO */}
//       </div>
//       <div className="w-full flex justify-center">
//         <button
//           onClick={handleContinue}
//           // disabled={!selectedSport}
//           className={`px-6 py-3 xl:py-4 rounded-lg font-bold transition-all duration-300 z-99 flex
//             ${
//               selectedSport
//                 ? "bg-green-500 hover:scale-105 text-white flex"
//                 : "hidden"
//             }
//           `}
//         >
//           Continuar
//         </button>
//       </div>
//       {isLoading && (
//         <div className="loading-spinner flex flex-col items-center">
//           <ClipLoader color="#4D5061" loading={isLoading} size={50} />
//           <p className="mt-3 text-sm text-gray-600">Iniciando sesión…</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AuthSelector;
