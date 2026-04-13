import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Authorization/AuthContext/AuthContext";
import loginImage from "../../assets/loginpage.png";
import boy from "../../assets/boy.png";
const Register = () => {
  const { creatUser } = useContext(AuthContext);
  const [bgImage, setBgImage] = useState(loginImage);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setBgImage(boy); // mobile image
      } else {
        setBgImage(loginImage); // desktop image
      }
    };

    handleResize(); // first load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="bg-[#dfdef0] w-full h-screen flex md:items-center md:justify-center">
      <div
        className="w-full h-[35%] md:w-[80vw] md:h-[35vw] bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
};

export default Register;
