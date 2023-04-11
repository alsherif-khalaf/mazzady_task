import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className=" grid place-content-center py-24">
      <Link href={"/first"} className="my-4  text-center border-2 border-black p-6 font-bold capitalize">The first task عربي</Link>
      <Link href={"/second"} className="my-4 text-center  border-2 border-black p-6 font-bold capitalize">The Second task</Link>
    </div>
  );
}
