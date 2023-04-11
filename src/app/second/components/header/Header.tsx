"use client";

import Image from "next/image";
import HeaderSearch from "./HeaderSearch";
import HoverableIcons from "../HoverableIcons";

const menuItems = [
  {
    name: "الرئيسية",
    link: "/",
  },
  {
    name: "التصنيفات",
    link: "/categories",
  },
  {
    name: "مشترياتي",
    link: "/my-purchases",
  },
  {
    name: "حسابي",
    link: "/my-account",
  },
];

export default function Header() {
  const time = new Date().toLocaleTimeString();

  return (
    <>
      <HeaderSearch />
      <header className="w-full  bg-gradient-to-r from-pink to-dark_pink  ">
        <div className="content_w w-full p-4 mx-auto max-w-7xl flex justify-between ">
          <ul className="menu-items">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="inline-block mx-2 text-white hover:text-dark_yellow duration-300 transition-all cursor-pointer"
              >
                {item.name}
              </li>
            ))}
          </ul>
          <div className=" header-left h-6 flex items-center justify-center gap-2">
            
            <HoverableIcons
              firstIconSrc={"/icons/calc_white.svg"}
              secIconSrc={"/icons/calc_gold.svg"}
            />

            <HoverableIcons
              firstIconSrc={"/icons/bell_white.svg"}
              secIconSrc={"/icons/bell_gold.svg"}
            />

            <HoverableIcons
              firstIconSrc={"/icons/heart_white.svg"}
              secIconSrc={"/icons/heart_gold.svg"}
            />

          </div>
        </div>
        
      </header>

    </>
  );
}
