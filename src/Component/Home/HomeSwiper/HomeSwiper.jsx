import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import image1 from "../../../assets/image1.png";
import image2 from "../../../assets/image2.png";
import image3 from "../../../assets/image3.png";

import { Pagination, Autoplay } from "swiper/modules";
import { GiChewedHeart } from "react-icons/gi";
import Container from "../../Container/Container";

const slides = [
  {
    image: image2,
    title: "Learn from every life experience",
    description:
      "Each moment of life teaches something meaningful. Even the hardest journeys shape our strength and help us inspire others.",
    align: "center",
    overlay: "bg-gradient-to-t from-black/80 via-black/40 to-[#31315d]/70",
  },
  {
    image: image1,
    title: "Real experience is the best teacher",
    description:
      "True wisdom comes from living, struggling, and growing through real experiences that leave lasting lessons in our hearts.",
    align: "left",
    overlay:
      "bg-gradient-to-r from-[#111827]/80 via-[#111827]/50 to-transparent",
  },
  {
    image: image3,
    title: "Be a part of our community",
    description:
      "Join a community where stories connect people together and every shared experience becomes a source of inspiration.",
    align: "right",
    overlay:
      "bg-gradient-to-l from-[#111827]/80 via-[#111827]/50 to-transparent",
  },
];

const HomeSwiper = () => {
  return (
    <Container>
      <div >
        <Swiper
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative h-[80vw] sm:h-[70vw] md:h-[55vw] lg:h-[42vw] xl:h-[38vw]"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay */}
                <div className={`absolute inset-0 ${slide.overlay}`}></div>

                {/* Content */}
                <div
                  className={`relative z-10 h-full flex items-center px-4 sm:px-8 md:px-14 ${
                    slide.align === "center"
                      ? "justify-center text-center"
                      : slide.align === "right"
                        ? "justify-end text-right"
                        : "justify-start text-left"
                  }`}
                >
                  <div className="max-w-full sm:max-w-xl md:max-w-2xl space-y-3 md:space-y-5">
                    {/* Icon */}
                    <div
                      className={`text-white text-4xl sm:text-5xl md:text-6xl ${
                        slide.align === "right"
                          ? "flex justify-end"
                          : slide.align === "center"
                            ? "flex justify-center"
                            : ""
                      }`}
                    >
                      <GiChewedHeart />
                    </div>

                    {/* Title */}
                    <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight supermercado">
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className="text-gray-200 text-xs sm:text-sm md:text-lg leading-relaxed">
                      {slide.description}
                    </p>
                  </div>
                </div>

                {/* Blur effect */}
                <div className="absolute inset-0 backdrop-blur-[1px]"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default HomeSwiper;
