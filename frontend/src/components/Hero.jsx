import { useState, useEffect } from "react";
import { Box, Container, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const images = [
  "https://wallpapercave.com/wp/wp4019982.jpg",
  "https://wtop.com/wp-content/uploads/2018/08/GettyImages-846567624.jpg",
  "https://th.bing.com/th/id/OIP.fnJdJg42zJrCJddiqVyruwHaDt?w=2000&h=1000&rs=1&pid=ImgDetMain",
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Container className="relative w-full lg:h-[500px] overflow-hidden mt-1">
      <Box
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
        ))}
      </Box>

      {/* Navigation Buttons */}
      {/* <IconButton onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white shadow-md"> */}
        {/* <ArrowBackIos className="text-gray-800" /> */}
      {/* </IconButton>
      <IconButton onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white shadow-md"> */}
        {/* <ArrowForwardIos className="text-gray-800" /> */}
      {/* </IconButton> */}

      {/* Dots Navigation */}
      <Box className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-blue-500 w-4" : "bg-gray-400"}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Box>
    </Container>
  );
}