import React from "react";

interface CompetitorsProps {
  src: string;
  name: string;
  number: number;
  time: string;
}

const Competitors: React.FC<CompetitorsProps> = ({
  src,
  name,
  number,
  time,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4  px-4 ">
        <div className="rounded-full overflow-hidden flex-shrink-0">
          <img
            src={src}
            alt={name}
            className="w-12 h-12 object-cover rounded-full"
          />
        </div>
        <div className="flex-1">
          <p className="font-bold text-dark_text">{name}</p>
          <p className="text-light_text">#{number}</p>
        </div>
      </div>
      <div className="number rounded-lg bg-dark_yellow/20 text-dark_yellow font-bold text-2xl pt-[0.33rem] px-3">{number}+</div>
    </div>
  );
};

export default Competitors;
