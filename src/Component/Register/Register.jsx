import React, { useContext } from "react";
import { AuthContext } from "../Authorization/AuthContext/AuthContext";
import loginImage from "../../assets/loginpage.png";
import boyone from "../../assets/boyone.png";
import { useForm } from "react-hook-form";
import axios from "axios";
const Register = () => {
  const { creatUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    const profileImage = data.image[0];
    creatUser(data.email, data.password).then(() => {
      const formData = new FormData();
      formData.append("image", profileImage);
      const imageKey = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`;
      axios.post(imageKey, formData).then((res) => {
        console.log(res.data.data.url);
        const imageUrl = res.data.data.res;
        const userData ={
          
        }
      });
    });
  };
  return (
    <div className="bg-[#dfdef0] relative w-full h-screen flex md:items-center md:justify-center">
      {/* laptop layout login page*/}
      <div
        className=" w-full rounded-xl h-[35%] md:w-[80vw] md:h-[38vw] bg-cover bg-center hidden md:flex justify-center  flex-col"
        style={{
          backgroundImage: `url(${loginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="card  w-full max-w-sm shrink-0 ml-[8vw]">
              <div className="card-body">
                <fieldset className="fieldset">
                  {/* user full name */}
                  <label className="label">Full Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Full Name"
                    {...register("name", { required: true })}
                  />
                  {errors.name?.type === "required" && (
                    <span className="text-red-500">
                      pleace enter your name!
                    </span>
                  )}
                  {/* user profile image */}
                  <label className="label">Select Image</label>
                  <input
                    {...register("image")}
                    type="file"
                    className="file-input"
                  />
                  {/* user email */}
                  <label className="label">Email</label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    className="input"
                    placeholder="Email"
                  />
                  {errors.email?.type === "required" && (
                    <span className="text-red-500">Enter email!</span>
                  )}
                  {/* user password */}
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    {...register("password", {
                      required: true,
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/,
                    })}
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-500">
                      Password is required. Please enter your password.
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-500">
                      Password must be at least 6 characters long and include at
                      least one uppercase letter, one lowercase letter, and one
                      special character.
                    </p>
                  )}
                  <button className="btn mt-4 bg-[#5d527d] text-white">
                    Login
                  </button>
                </fieldset>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* phone layout login page */}
      <div className="md:hidden">
        <div>
          <img src={boyone} className="w-full h-[20%]" alt="" />
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="card   shrink-0 ">
              <div className="card-body">
                <fieldset className="fieldset">
                  <label className="label">Full Name</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="Full Name"
                  />
                  <label className="label">Select Image</label>
                  <input type="file" className="file-input" />
                  <label className="label">Email</label>
                  <input type="email" className="input" placeholder="Email" />
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                  />
                  <button className="btn mt-4 bg-[#5d527d] text-white">
                    Login
                  </button>
                </fieldset>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
