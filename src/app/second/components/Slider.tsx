"use client";
import React, { MutableRefObject } from "react";

import "./styles.css";
import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

const carImages = [
  {
    id: 1,
    src: "/cars/01.jpg",
    alt: "car 1",
  },
  {
    id: 2,
    src: "/cars/02.webp",
    alt: "car 2",
  },
  {
    id: 3,
    src: "/cars/03.jpeg",
    alt: "car 3",
  },
  {
    id: 4,
    src: "/cars/04.jpg",
    alt: "car 4",
  },
  {
    id: 5,
    src: "/cars/05.jpg",
    alt: "car 5",
  },
];

export default function Slider() {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    rtl: true,
  });

  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      mode: "free",
      rtl: true,
      slides: {
        origin: "center",
        perView: 4,
        spacing: 15,
      },
      vertical: true,
    },
    [ThumbnailPlugin(instanceRef)]
  );

  return (
    <div className="flex" dir="ltr">
      <div ref={sliderRef} className="keen-slider">
        {carImages.map((car) => (
          <div
            key={car.id}
            className="keen-slider__slide h-[400px] aspect-auto"
          >
            <Image
              fill
              src={car.src}
              alt={car.alt}
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      <div
        ref={thumbnailRef}
        className="keen-slider relative thumbnail vertical-slider h-full max-w-[10%] mx-2"
        style={{ height: 400 }}
      >
        
        {carImages.map((car) => (
          <div
            key={car.id}
            className="keen-slider__slide h-[400px] aspect-auto"
          >
            <Image
              fill
              src={car.src}
              alt={car.alt}
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

{
  /* <div className="civeron_up z-50 p-2 flex items-center justify-center bg-white/40 rounded-full">
        {"^"}
      </div>

      <div className="civeron_down transform scale-y-[-1] z-50 p-2 flex items-center justify-center bg-white/40 rounded-full">
        {"^"}
      </div> */
}
