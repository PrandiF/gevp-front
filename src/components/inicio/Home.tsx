import Header from "../Header";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AlternativaHome from "./AlternativaHome";

function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="relative flex w-full items-center z-20 h-screen">
      <Header />
      <AlternativaHome />
    </div>
  );
}

export default Home;
