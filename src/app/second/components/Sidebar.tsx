import Competitors from "./Competitors";

const competitors = [
  {
    key: 1,
    name: "علي الجاسم",
    number: +20,
    src: "https://randomuser.me/api/portraits/men/30.jpg",
    time : '15:14:51'
  },
  {
    key:2,
    name: "أحمد العلي",
    number: +24,
    src: "https://randomuser.me/api/portraits/men/31.jpg",
    time : '15:14:51'
  },
  {
    key:3,
    name: "محمد السيد",
    number: +10,
    src: "https://randomuser.me/api/portraits/men/32.jpg",
    time : '15:14:51'
  },
  {
    key:4,
    name: "عبدالرحمن العبدالله",
    number: +25,
    src: "https://randomuser.me/api/portraits/men/33.jpg",
    time : '15:14:51'
  },
  {
    key:5,
    name: "سلمان الغامدي",
    number: +30,
    src: "https://randomuser.me/api/portraits/men/34.jpg",
    time : '15:14:51'
  },
];

export const Sidebar = () => {
  return (
    <div className="">
      <div className="live space-y-2 bg-white drop-shadow-2xl  rounded-lg pt-4 pb-8 px-4">
        <div className="flex items-center justify-between p-3 text-white rounded-lg bg-dark_text">
          <p className="">تاريخ البث</p>
          <p className="font-bold -mb-[3px]"> 11-4-2023</p>
        </div>

        <div className="current_mazzad flex gap-2">
          <div className="text-center bg-purble text-white p-4 rounded-lg flex-1 relative ">
            <p className="text-l truncate">القيمة الحالية للمزاد</p>
            <p className="font-bold text-2xl">
              5000 <span className="text-sm">$</span>
            </p>
            <div className="owner absolute bottom-[-1rem] left-1/2 transform -translate-x-1/2 w-[70%] bg-white drop-shadow-xl rounded-full flex items-center justify-center gap-1 p-[2px]">
              <img
                src="https://randomuser.me/api/portraits/men/5.jpg"
                alt="car"
                className="w-5 h-5 object-cover rounded-full"
              />
              <span className="truncate text-purble text-xs font-bold">
                عبد السلام علي
              </span>
            </div>
          </div>

          <div className="text-center bg-purble/20 text-purble p-4 rounded-lg flex-1 ">
            <p className="text-l  truncate">القيمة الحالية بعد الضريبة</p>
            <p className="font-bold text-2xl">
              5050 <span className="text-sm">$</span>
            </p>
          </div>
        </div>
      </div>

      <div className="competitors  bg-white drop-shadow-2xl rounded-lg pt-4 pb-8 px-4 my-8">
        <h4 className="text-black_text font-bold text-2xl my-2">المتنافسون</h4>
        <div className="competitors_list space-y-4 mt-4">
          {competitors.map((competitor) => (
            <Competitors
              key={competitor.key}
              name={competitor.name}
              number={competitor.number}
              src={competitor.src}
              time={competitor.time}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


