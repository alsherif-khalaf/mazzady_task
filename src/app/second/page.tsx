import ClientOnly from "../first/components/ClientOnly";
import Slider from "../second/components/Slider";
import Seller from "./components/Seller";
import { Sidebar } from "./components/Sidebar";

function page() {
  return (
    <div className="content md:flex gap-4 mx-auto w-full md:max-w-[81vw] max-w-7xl pt-4">
      <div className="slider md:w-[67%]  ">
        <ClientOnly>
          <div className="item_seal pb-4 bg-white drop-shadow-2xl rounded-lg">
            <Slider />
            <div className="Seller mt-6 mx-4">
              <Seller
                name="علاء وجدي"
                phoneNumber="+0201009449472"
                image="https://randomuser.me/api/portraits/men/20.jpg"
                rating={3}
              />
            </div>

            <div className="item_details py-6 mx-4 ">
              <h1 className="text-dark_text font-bold text-2xl">
                1990شراء مجموعة من السيارات من موديلات
              </h1>
              <p className="text-gray-500">code : 1254</p>
            </div>
            <div className="add_  mx-4 md:flex space-y-4 md:space-y-0 justify-between ">
              <div className="numbers flex gap-2">
                <span className="bg-pink/10  text-pink inline-flex items-center justify-center p-2">
                  +10000
                </span>
                <span className="bg-pink/10  text-pink inline-flex items-center justify-center p-2">
                  +12550
                </span>

                <span className="bg-pink/10  text-pink inline-flex items-center justify-center p-2">
                  +11000
                </span>
              </div>

              <div className="input ">
                <input
                  type="text"
                  placeholder="اكتب المبلغ"
                  className="   rounded-sm border border-gray-300 py-2 px-4 outline-none   focus:outline-none focus:border-pink/40 focus:ring-0"
                />
                <button className=" ms-2 bg-gradient-to-r from-pink to-dark_pink  py-2 px-6  rounded-sm font-bold text-white">
                  تأكيد
                </button>
              </div>
            </div>
          </div>
          <div className="message bg-white drop-shadow-2xl rounded-lg my-8 p-4">
            <h3 className="text-dark_text font-bold text-2xl mb-2">
              ارسال رسالة الى البائع
            </h3>
            <p className="text-dark_text">
              يمكنك في وقت البث المباشر ارسال رسالة الى البائع للاستفسار
            </p>

            <div className="input flex items-center pt-4">
              <input
                type="text"
                placeholder="اكتب سؤالك  "
                className="   rounded-full bg-gray-100 border border-gray-300 py-2 px-4 flex-1 outline-none   focus:outline-none focus:border-pink/40 focus:ring-0 "
              />
              <button className=" ms-2">
                <span>
                  <img src="/icons/send.svg" alt="send" />
                </span>
              </button>
            </div>
          </div>
        </ClientOnly>
      </div>

      <div className="sidebar flex-1">
        <Sidebar />
      </div>
    </div>
  );
}

export default page;
