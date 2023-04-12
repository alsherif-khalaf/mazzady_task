import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className=" grid place-content-center py-24">
      <Link href={"/first"} className="my-4  text-center border-2 border-black p-6 font-bold capitalize">The first task Selection : Server Components </Link>
      <Link href={"/first_02"} className="my-4  text-center border-2 border-black p-6 font-bold capitalize">The first task Selection : Client Components </Link>
      <Link href={"/second"} className="my-4 text-center  border-2 border-black p-6 font-bold capitalize">The Second task UI DESIGN</Link>
    </div>
  );
}
