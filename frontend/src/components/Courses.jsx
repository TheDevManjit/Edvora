import React, { useEffect, useState } from 'react';
import Card from './Card';
import { fetchCourses } from '../utility/api';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import Categories from './Categories';

function Courses() {
    const [courses, setCourses] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

    // Mobile Swiper Settings
    const mobileSettings = { 
        effect: 'cards',
        grabCursor: true,
        modules: [EffectCards, Autoplay], // Ensure autoplay is included
        className: "mySwiper",
        
    };
  
      


    // Desktop Swiper Settings
    const desktopSettings = { 
        spaceBetween: 20, // Gap between slides
        slidesPerView: 1, // Default for mobile
        breakpoints: {
            640: { slidesPerView: 2 }, // Tablets
            1024: { slidesPerView: 3 }, // Small laptops
            1280: { slidesPerView: 4 }, // Large screens
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: { clickable: true },
        navigation: {
            enabled: !isMobile, // Hide navigation on mobile
        },
        modules: [Autoplay, Pagination, Navigation],
        className: "mySwiper",
    };

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
        <>
       
        <Categories/>
        <div className="w-full max-w-6xl lg:max-w-full mx-auto mt-1 p-5">
          <div className={isMobile ? "block" : "hidden"}>
          <Swiper {...mobileSettings}>
                {courses.map((course) => (
                    <SwiperSlide key={course.id}>
                        <Card course={course} />
                    </SwiperSlide>
                ))}
            </Swiper>
          </div>
          <div className={isMobile ? "hidden" : "block"} w-full>
          <Swiper {...desktopSettings}>
                {courses.map((course) => (
                  <div className='grid  lg:grid-cols-3 xl:grid-cols-4'>
                  <SwiperSlide key={course.id}>
                        <Card course={course} />
                    </SwiperSlide>
                  </div>
                    
                ))}
            </Swiper>
          </div>
            
        </div>
    </>
    );
}

export default Courses;
