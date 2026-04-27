import React from "react";
import dearr from "../../assets/dearr2.jpg";
import { useForm } from "react-hook-form";
import { GiChewedHeart } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router";
import Container from "../Container/Container";
import useAuth from "../../Hook/useAuth";
import axios from "axios";
import useAxios from "../../Hook/useAxios";
import Swal from "sweetalert2";
import GoogleSing from "../GoogleSing/GoogleSing";
const Register = () => {
  const normalAxios = useAxios();
  const { creatUser, updateUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleRegister = (data) => {
    console.log(data);
    const imageFile = data.image[0];
    creatUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", imageFile);
        const bdKey = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`;
        axios.post(bdKey, formData).then((res) => {
          const userImage = res.data.data.url;
          const userInfo = {
            userName: data.name,
            userEmail: data.email,
            userImage: userImage,
          };
          normalAxios.post("/user", userInfo).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Register Successfull!",
                icon: "success",
                draggable: true,
              });
            }
          });
          const userUpdateInfo = {
            displayName: data.name,
            photoURL: userImage,
          };
          updateUser(userUpdateInfo)
            .then(() => {
              navigate(location.state || "/");
            })
            .catch(() => {});
          reset();
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User already exist!",
        });
      });
  };

  return (
    <div className="bg-[#3735421f]">
      <Container>
        <div className="h-screen md:overflow-hidden  flex-col-reverse md:flex-row flex items-center justify-between">
          <div className="hidden md:flex-1 w-full md:h-[80vw]  md:flex items-center justify-center">
            <img className="md:h-[50%] rounded-4xl" src={dearr} alt="" />
          </div>
          <div className="card flex-1 shrink-0 py-2">
            <div className="card-body w-full">
              <form onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset w-full">
                  <label className="text-center text-2xl font-bold text-[#5d527d]">
                    {" "}
                    Sing in to Discover The Earth!
                  </label>
                  {/* name */}
                  <label className="label">Full Name</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Full Name"
                    {...register("name", { required: true })}
                  />
                  {errors.name?.type === "required" && (
                    <p className="text-red-500">Enter your full name!</p>
                  )}
                  {/* image */}
                  <label className="label">Profile Image</label>
                  <input
                    type="file"
                    className="file-input w-full"
                    placeholder="Full Name"
                    {...register("image", { required: true })}
                  />
                  {errors.image?.type === "required" && (
                    <p className="text-red-500">Enter your profile image</p>
                  )}
                  {/* email */}
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input w-full"
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                  {errors.email?.type === "required" && (
                    <p className="text-red-500">Enter your email!</p>
                  )}
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input w-full"
                    placeholder="Password"
                    {...register("password", {
                      required: true,
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/,
                    })}
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-500">Creat a password!</p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-500">
                      Password must be at least 6 characters long and include at
                      least one uppercase letter, one lowercase letter, and one
                      special character.
                    </p>
                  )}
                  <p>
                    Already have an account{" "}
                    <Link
                      to={"/login"}
                      state={location.state}
                      className="text-blue-500 underline"
                    >
                      Log In
                    </Link>
                  </p>
                  <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
              </form>
              <div>
                <GoogleSing></GoogleSing>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
