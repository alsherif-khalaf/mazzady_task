"use client";

import Image from "next/image";
import { Dropdown } from "../Dropdown";

export default function HeaderSearch() {
  return (
    <div className="w-full p-4 mx-auto max-w-7xl flex flex-col gap-4 md:flex-row  justify-between items-center">
     
      <div className="search basis-3/4 order-1">

        <div className=" flex w-full">
          <Dropdown />
          <div className="input flex  flex-1">
            <input
              type="text"
              className="w-full bg-light_pink  text-lg p-1    border-4 border-transparent duration-300  transition-all  ms-1 placeholder:text-slate-700 outline-none   focus:outline-none focus:border-white/40 focus:ring-white/40 focus:ring-1 "
              placeholder="ابحث هنـا"
            />
            <div className="maginfyer bg-pink -ms-1 py-1 px-6 rounded-lg flex items-center justify-center ">
                <Image
                    src={"./icons/magnifier.svg"}
                    width={20}
                    height={20}
                    alt="mazzady"
                    className=" cursor-pointer"
                />
            </div>
          </div>
        </div>

      </div>

      <div className="logo order-2 md:order-1 ">
        <Image
          src={"./mazzady_logo.svg"}
          width={160}
          height={80}
          alt="mazzady"
          className=" cursor-pointer -m-1"
        />
      </div>
    </div>
  );
}
