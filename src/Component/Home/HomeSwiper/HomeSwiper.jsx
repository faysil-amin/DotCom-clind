import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import image1 from "../../../assets/image1.png";
import image2 from "../../../assets/image2.png";
import image3 from "../../../assets/image3.png";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { GiChewedHeart } from "react-icons/gi";
const HomeSwiper = () => {
  return (
    <div>
      <Swiper
        pagination={true}
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className="rounded-xl"
            style={{
              backgroundImage: `url(${image2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "40vw",
            }}
          >
            <div className="w-full h-full rounded-xl bg-linear-to-t from-transparent to-[#31315d]">
              <div className="flex items-center justify-center flex-col absolute left-1/2 -translate-x-1/2 top-[6vw]">
                <a className=" text-[5vw] font-bold text-white ">
                  <GiChewedHeart />
                </a>
                <h1 className="text-white text-center text-[3vw] text-bold font-bold supermercado">
                  Learn from even life experience{" "}
                </h1>
                <p className="text-[1.2vw] text-center  text-white">
                  Each beat of our existence is shaped by the courage of those
                  who showed us the light even in our darkest moments.Their
                  legacy lives on in the strength we find to illuminate the path
                  for those who follow.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="rounded-xl relative"
            style={{
              backgroundImage: `url(${image1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "40vw",
            }}
          >
            <div className="w-full h-full rounded-xl bg-linear-65 from-[#31315d] to-transparent">
              <div className=" absolute left-[5vw] top-[17vw]">
                <div className=" text-[5vw] font-bold text-white ">
                  <GiChewedHeart />
                </div>
                <h1 className="text-white text-4xl text-bold font-bold supermercado text-[3vw]">
                  Real experience is the best teacher{" "}
                </h1>
                <p className="text-[1.2vw] w-1/2 text-white">
                  True wisdom is never borrowed from pages, but earned through
                  the raw and honest trials of our own journey. It is the scars
                  and successes of real life that carve the most enduring
                  lessons into our souls.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="rounded-xl relative"
            style={{
              backgroundImage: `url(${image3})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "40vw",
            }}
          >
            <div className="w-full h-full rounded-xl bg-linear-to-br from-transparent to-[#31315d] flex justify-end  pr-[5vw]">
              <div className="w-1/2 absolute top-[15vw]">
                {" "}
                <div className=" flex justify-end text-[5vw] font-bold text-white ">
                  <GiChewedHeart />
                </div>
                <h1 className="text-[3vw] text-end text-white text-4xl font-bold supermercado">
                  Be a part of our community
                </h1>
                <div
                  className="text-[1.2vw]
                 text-end text-white relative"
                >
                  <p>
                    Step into a space where every story adds a new thread to our
                    collective journey and every voice finds its home. By
                    joining us, you turn a solitary path into a shared
                    adventure, growing stronger through the wisdom of those who
                    walk beside you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeSwiper;
