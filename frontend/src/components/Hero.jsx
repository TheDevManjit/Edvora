import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box, Container } from '@mui/material';
import rularImg from '../assets/img/rular.png';
import vocationalImg from '../assets/img/vocational.png';

const images = [rularImg, vocationalImg];

export default function HeroCarousel() {
  return (
    <Container className="relative w-full lg:h-[500px] overflow-hidden mt-1" maxWidth="xl">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="w-full h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Box component="img" src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
