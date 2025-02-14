import { useState, useEffect } from "react";

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
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full lg:h-[500px] overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
        ))}
      </div>
    </div>
  );
}
