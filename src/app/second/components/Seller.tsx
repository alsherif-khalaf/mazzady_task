"use client";

import { FC, useState } from "react";
import HeartRating from "./HeartRating";

type SellerProps = {
  name: string;
  phoneNumber: string;
  image: string;
  rating: number;
};

const Seller: FC<SellerProps> = ({ name, phoneNumber, image, rating }) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const heartColor = isLiked ? "text-red-500" : "text-gray-300";

  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />

        <div className="absolute bottom-[-1.75rem] left-[-2.25rem] transform translate-x-1/2 -translate-y-1/2">
          <div
            className="bg-white flex items-center justify-center p-2 drop-shadow-md rounded-full"
            onClick={toggleLike}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 cursor-pointer ${heartColor} fill-current`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18.031l-1.147-1.044C3.89 12.037 1.26 9.157 1.26 5.766 1.26 2.992 3.403.837 6.176.837c1.603 0 3.181.853 3.825 2.025.645-1.172 2.223-2.025 3.825-2.025 2.773 0 4.916 2.155 4.916 4.929 0 3.391-2.63 6.271-7.592 11.221L10 18.031z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <div className="name stars flex items-center gap-3">
          <p className="font-bold text-violet-900">{name}</p>
          <HeartRating rating={rating} />
        </div>
        <p className="text-gray-400 py-1">{phoneNumber}</p>
      </div>

    </div>
  );
};

export default Seller;
