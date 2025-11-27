"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface CarouselProps {
  images: { src: any; alt: string }[];
}

export default function Carousel({ images }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full overflow-hidden flex justify-center items-center h-[200px] md:h-[220px]">
      {images.map((img, index) => {
        let positionClass =
          "absolute transition-all duration-700 rounded-[12px]";

        if (index === current) {
          positionClass += " left-1/2 top-0 transform -translate-x-1/2 z-10 scale-100 opacity-100";
        } else if (index === (current + 1) % images.length) {
          positionClass += " left-[75%] top-0 transform -translate-x-1/2 z-0 scale-90 opacity-70";
        } else if (index === (current + images.length - 1) % images.length) {
          positionClass += " left-[25%] top-0 transform -translate-x-1/2 z-0 scale-90 opacity-70";
        } else {
          positionClass += " opacity-0 scale-90 z-0";
        }

        return (
          <Image
            key={index}
            src={img.src}
            alt={img.alt}
            width={280}
            height={180}
            className={positionClass + " object-cover"}
          />
        );
      })}
    </div>
  );
}
