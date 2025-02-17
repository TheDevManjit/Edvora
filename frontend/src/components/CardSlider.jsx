import React, { useEffect, useState } from "react";
import Card from "./Card";
import { fetchCourses } from "../utility/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import "../App.css";

function CardSlider() {
  const [courses, setCourses] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCourses();
        setCourses(response);
      } catch (error) {
        console.error("Error in course fetching:", error.message);
      }
    };

    fetchData();

    // Handle mobile responsiveness
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full max-w-6xl lg:max-w-full mx-auto mt-1 p-5">
      {/* Mobile Swiper */}
      {isMobile ? (
        <Swiper
          effect="cards"
          grabCursor={true}
          modules={[EffectCards, Autoplay]}
          className="mySwiper"
        >
          {courses.map((course, index) => (
            <SwiperSlide key={course.id || index}>
              <Card course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // Desktop Swiper
        <Swiper
          spaceBetween={20}
          slidesPerView={1} // Default for mobile
          breakpoints={{
            640: { slidesPerView: 2 }, // Tablets
            1024: { slidesPerView: 3 }, // Small laptops
            1280: { slidesPerView: 4 }, // Large screens
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {courses.map((course, index) => (
            <SwiperSlide key={course.id || index}>
              <Card course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default CardSlider;
