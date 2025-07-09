// components/BackgroundCarousel.tsx
"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Use your actual images from the public folder
const images = [
  "/1-full.webp",
  "/2-full.webp",
  "/3-full.webp",
  "/4-full.webp",
  "/5-full.webp",
  "/6-full.webp",
];

// Use original images array
const carouselImages = images;

export default function BackgroundCarousel() {
  return (
    <>
      {/* Mobile: Only show the image, no black bars, content starts right after */}
      <div className="block sm:hidden w-full">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          loop={false}
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={0}
          className="w-full"
        >
          {carouselImages.map((img, index) => (
            <SwiperSlide key={img}>
              <Image
                src={img}
                alt={`Background carousel ${index + 1}`}
                className="w-full h-auto object-contain"
                style={{ display: "block" }}
                width={1000}
                height={1000}
                priority={img === "/1-full.webp"}
                loading={img === "/1-full.webp" ? "eager" : "lazy"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: Carousel with navigation and pagination */}
      <div className="hidden sm:block absolute top-0 left-0 w-full h-80 md:h-96 lg:h-140 z-30 overflow-hidden">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
          }}
          loop={false}
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={0}
          className="w-full h-full"
        >
          {carouselImages.map((img) => (
            <SwiperSlide key={img}>
              <div
                className="w-full h-full bg-black"
                style={{
                  backgroundImage: `url('${img}')`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </SwiperSlide>
          ))}
          
          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev !text-white !bg-white/60 hover:!bg-white/80 !rounded-full !w-10 !h-10 !items-center !justify-center !border !border-white !shadow-lg">
            <span className="text-black text-2xl">&#8592;</span>
          </div>
          <div className="swiper-button-next !text-white !bg-white/60 hover:!bg-white/80 !rounded-full !w-10 !h-10 !items-center !justify-center !border !border-white !shadow-lg">
            <span className="text-black text-2xl">&#8594;</span>
          </div>
          
          {/* Custom Pagination */}
          <div className="swiper-pagination !bottom-4"></div>
        </Swiper>
      </div>

      {/* Custom CSS for Swiper styling */}
      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: white !important;
          background: rgba(255, 255, 255, 0.6) !important;
          border-radius: 50% !important;
          width: 40px !important;
          height: 40px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          border: 1px solid white !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
          transition: background-color 0.3s ease !important;
        }

        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: rgba(255, 255, 255, 0.8) !important;
        }

        .swiper-button-prev::after,
        .swiper-button-next::after {
          display: none !important;
        }

        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.6) !important;
          opacity: 1 !important;
        }

        .swiper-pagination-bullet-active {
          background: white !important;
        }
      `}</style>
    </>
  );
}