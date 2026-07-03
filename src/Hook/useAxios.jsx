import axios from "axios";
import React from "react";
const instance = axios.create({
  baseURL: "https://dot-com-server-1ondbikjc-faysil-amin-nihads-projects.vercel.app",
});
const useAxios = () => {
  return instance;
};

export default useAxios;
