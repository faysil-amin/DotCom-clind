import React from "react";
import Container from "../Container/Container";
import HomeSwiper from "./HomeSwiper/HomeSwiper";
import HomeLesson from "./HomeLesson/HomeLesson";

const Home = () => {
  return (
    <Container>
      <HomeSwiper></HomeSwiper>
      <HomeLesson></HomeLesson>
    </Container>
  );
};

export default Home;
