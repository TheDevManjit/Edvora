import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { Box, Typography, Button, Container } from "@mui/material";

const categories = {
  "Data Science": [
    { name: "Machine Learning", learners: "8M+", youtubeLink: "https://www.youtube.com/embed/qvxtZg3X3nU" },
    { name: "Deep Learning", learners: "2M+", youtubeLink: "https://www.youtube.com/embed/aircAruvnKk" },
    { name: "Data Analysis", learners: "5M+", youtubeLink: "https://www.youtube.com/embed/5m9RVQNcTGk" },
    { name: "Big Data", learners: "3M+", youtubeLink: "https://www.youtube.com/embed/lDwy52jwsR8" },
    { name: "AI & Neural Networks", learners: "4M+", youtubeLink: "https://www.youtube.com/embed/J2qz0RT8Tz8" }
  ],
  "Python": [
    { name: "Core Python", learners: "47.7M+", youtubeLink: "https://www.youtube.com/embed/rfscVS0vtbw" },
    { name: "Django & Flask", learners: "6M+", youtubeLink: "https://www.youtube.com/embed/OeojVfhyvA4" },
    { name: "Data Science with Python", learners: "10M+", youtubeLink: "https://www.youtube.com/embed/LHBE6Q9XlzI" },
    { name: "Automation & Scripting", learners: "5M+", youtubeLink: "https://www.youtube.com/embed/zC26CPIySxQ" },
    { name: "Python for AI", learners: "8M+", youtubeLink: "https://www.youtube.com/embed/7wG6K4CLd7M" }
  ],
  "IT Certification": [
    { name: "AWS Certification", learners: "4M+", youtubeLink: "https://www.youtube.com/embed/3hLmXS2mYBQ" },
    { name: "CompTIA A+", learners: "3M+", youtubeLink: "https://www.youtube.com/embed/VU7g6QXsQw" },
    { name: "Google Cloud Certification", learners: "2M+", youtubeLink: "https://www.youtube.com/embed/2p1CZ5t2Qg" },
    { name: "Cisco CCNA", learners: "3.5M+", youtubeLink: "https://www.youtube.com/embed/6Z9Q9XwQ7vY" },
    { name: "Cybersecurity Certification", learners: "4.5M+", youtubeLink: "https://www.youtube.com/embed/UfT9G9lJjHw" }
  ],
  "Leadership": [
    { name: "Business Strategy", learners: "5M+", youtubeLink: "https://www.youtube.com/embed/1B5f0i2qWnE" },
    { name: "Project Management", learners: "6M+", youtubeLink: "https://www.youtube.com/embed/3cxixDgOr54" },
    { name: "Entrepreneurship", learners: "3.5M+", youtubeLink: "https://www.youtube.com/embed/5xN6rJ6ZwqQ" },
    { name: "Team Leadership", learners: "4M+", youtubeLink: "https://www.youtube.com/embed/2gkVQjXu2lE" },
    { name: "Decision Making", learners: "3M+", youtubeLink: "https://www.youtube.com/embed/3j9IOaXMAc" }
  ],
  "Web Development": [
    { name: "Frontend Development", learners: "12M+", youtubeLink: "https://www.youtube.com/embed/1RVXyM7V7Vw" },
    { name: "Backend Development", learners: "8M+", youtubeLink: "https://www.youtube.com/embed/TlB_eWDSMt4" },
    { name: "Full Stack Development", learners: "7M+", youtubeLink: "https://www.youtube.com/embed/ZtUhn6YjQ5U" },
    { name: "React & Next.js", learners: "6M+", youtubeLink: "https://www.youtube.com/embed/4l7xVoSKgI4" },
    { name: "Node.js & Express", learners: "5M+", youtubeLink: "https://www.youtube.com/embed/f2EqECiTBL8" }
  ]
};

export default function CourseCategories() {
  const [selectedCategory, setSelectedCategory] = useState("Data Science");

  return (
    <Container className="p-6" maxWidth="xl">
      {/* Category Buttons */}
      <Box className="flex flex-wrap gap-4 mb-6">
        {Object.keys(categories).map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "contained" : "outlined"}
            color="primary"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </Box>

      {/* Swiper Slider */}
      <Box className="relative">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          className="pb-6"
        >
          {categories[selectedCategory].map((sub) => (
            <SwiperSlide key={sub.name}>
              <Box className="bg-white shadow-lg rounded-lg p-4 border text-center">
                <Typography variant="h6" fontWeight="bold">{sub.name}</Typography>
                <Typography variant="body2" color="textSecondary">{sub.learners} learners</Typography>
                {/* <Box className="mt-4">
                  <iframe
                    width="100%"
                    height="180"
                    src={sub.youtubeLink}
                    title={sub.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </Box> */}
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
}
