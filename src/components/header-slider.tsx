"use client";

import { useEffect, useState } from "react";

import { assets } from "@/assets";
import Image from "next/image";

export default function HeaderSlider() {
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Coming Soon",
      buttonText2: "Find more",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Coming Soon",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Coming Soon",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex min-w-full flex-col-reverse items-center justify-between bg-black px-5 py-8 text-white md:flex-row md:px-14"
          >
            <div className="mt-10 md:mt-0 md:pl-8">
              <h1 className="max-w-lg text-2xl font-semibold md:text-[40px] md:leading-12">
                {slide.title}
              </h1>
              <div className="mt-4 flex items-center md:mt-6">
                <button className="rounded-full bg-[#fce3c7] px-7 py-2 font-medium text-black md:px-10 md:py-2.5">
                  {slide.buttonText1}
                </button>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <Image
                className="w-48 md:w-72"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 cursor-pointer rounded-full ${
              currentSlide === index ? "bg-[#043033]" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
