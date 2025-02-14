import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation"; // Import navigation styles
import "swiper/css/pagination";
import "../App.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icons for custom navigation

const categories = {
  "Data Science": [
    { name: "Machine Learning", learners: "8M+" },
    { name: "Deep Learning", learners: "2M+" },
    { name: "Data Analysis", learners: "5M+" },
    { name: "Big Data", learners: "3M+" },
    { name: "AI & Neural Networks", learners: "4M+" }
  ],
  "Python": [
    { name: "Core Python", learners: "47.7M+" },
    { name: "Django & Flask", learners: "6M+" },
    { name: "Data Science with Python", learners: "10M+" },
    { name: "Automation & Scripting", learners: "5M+" },
    { name: "Python for AI", learners: "8M+" }
  ],
  "IT Certification": [
    { name: "AWS Certification", learners: "4M+" },
    { name: "CompTIA A+", learners: "3M+" },
    { name: "Google Cloud Certification", learners: "2M+" },
    { name: "Cisco CCNA", learners: "3.5M+" },
    { name: "Cybersecurity Certification", learners: "4.5M+" }
  ],
  "Leadership": [
    { name: "Business Strategy", learners: "5M+" },
    { name: "Project Management", learners: "6M+" },
    { name: "Entrepreneurship", learners: "3.5M+" },
    { name: "Team Leadership", learners: "4M+" },
    { name: "Decision Making", learners: "3M+" }
  ],
  "Web Development": [
    { name: "Frontend Development", learners: "12M+" },
    { name: "Backend Development", learners: "8M+" },
    { name: "Full Stack Development", learners: "7M+" },
    { name: "React & Next.js", learners: "6M+" },
    { name: "Node.js & Express", learners: "5M+" }
  ]
};

export default function CourseCategories() {
  const [selectedCategory, setSelectedCategory] = useState("Data Science");

  return (
    <div className="p-6">
      {/* Category Selection */}
      <div className="flex flex-wrap gap-4 mb-6">
        {Object.keys(categories).map((category) => (
          <p
            key={category}
            className={`cursor-pointer text-lg font-semibold px-4 py-2 rounded-lg ${
              selectedCategory === category ? "bg-blue-600 text-white" : "text-gray-800"
            } hover:bg-blue-500 hover:text-white transition`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </p>
        ))}
      </div>

      {/* Swiper Slider with Navigation */}
      <div className="relative">
        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev custom-nav-btn left-0 w-2 h-3">
          <FaChevronLeft />
        </button>
        <button className="swiper-button-next custom-nav-btn right-0">
          <FaChevronRight />
        </button>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
        //   navigation={{
        //     nextEl: ".swiper-button-next",
        //     prevEl: ".swiper-button-prev",
        //   }}
          pagination={{ clickable: true }}
          className="pb-6"
        >
          {categories[selectedCategory].map((sub) => (
            <SwiperSlide key={sub.name}>
              <div className="bg-white shadow-lg rounded-lg p-4 border text-center">
                <h3 className="text-lg font-bold">{sub.name}</h3>
                <p className="text-gray-600">{sub.learners} learners</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
