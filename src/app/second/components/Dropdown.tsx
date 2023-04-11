"use client";

import { useState } from "react";

export const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="bg-light_pink  text-pink p-1 w-full  items-center justify-between text-lg 
       rounded-r-lg  flex gap-2  border-4 border-transparent active:border-white/40 active:text-white duration-300  transition-all   group "
      >
        مزاد مباشر متعدد
        <span
          className={`chevron text-pink group-active:text-white  duration-300  transition-all ${
            isOpen ? "transform scale-y-[-1]" : "closed"
          } `}
        >
          <svg
            width={12}
            height={8}
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.34247 5.34151C5.38849 5.29502 5.4294 5.24373 5.46447 5.18851L9.08947 1.56351C9.25947 1.39351 9.35498 1.16293 9.35498 0.922511C9.35498 0.682089 9.25947 0.451515 9.08947 0.281511C8.91947 0.111507 8.68889 0.016 8.44847 0.016C8.20805 0.016 7.97747 0.111507 7.80747 0.281511L4.68547 3.40051L1.54747 0.265511C1.46329 0.181334 1.36336 0.11456 1.25338 0.069004C1.14339 0.0234476 1.02551 1.77391e-09 0.906469 0C0.787425 -1.7739e-09 0.669546 0.0234476 0.559563 0.069004C0.449579 0.11456 0.349647 0.181334 0.26547 0.265511C0.181293 0.349688 0.114518 0.449621 0.0689621 0.559604C0.023406 0.669587 -4.19617e-05 0.787466 -4.19617e-05 0.906511C-4.19617e-05 1.02556 0.023406 1.14343 0.0689621 1.25342C0.114518 1.3634 0.181293 1.46333 0.26547 1.54751L3.90747 5.18851C3.984 5.30277 4.08468 5.39884 4.20239 5.46995C4.3201 5.54106 4.45198 5.58548 4.58872 5.60007C4.72547 5.61466 4.86375 5.59907 4.99381 5.55439C5.12387 5.50972 5.24355 5.43705 5.34247 5.34151Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="absolute left-0 w-full bg-white/50 p-1 drop-shadow-lg rounded-b-lg ">
          <ul className="flex flex-col  ">
            <li
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="bg-light_pink  text-pink rounded-lg p-2 mt-2 cursor-pointer"
            >
              مزاد مباشر متعدد
            </li>
            <li
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="bg-light_pink  text-pink rounded-lg p-2 mt-2 cursor-pointer"
            >
              مزاد مباشر متعدد
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
