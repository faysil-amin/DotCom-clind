import React, { useContext } from "react";
import { AuthContext } from "../Authorization/AuthContext/AuthContext";
import loginImage from "../../assets/loginpage.png";
const Register = () => {
  const { creatUser } = useContext(AuthContext);
  return (
    <div
      style={{
        backgroundImage: `url(${loginImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "40vw",
      }}
    ></div>
  );
};

export default Register;
