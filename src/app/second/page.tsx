import ClientOnly from "../first/components/ClientOnly";
import Slider from "../second/components/Slider";
import Seller from "./components/Seller";

function page() {
  return (
    <div className="content md:flex gap-4">
      <div className="slider md:w-2/3 bg-white drop-shadow-md rounded-lg p-4">
        <ClientOnly>
          <Slider />
          <div className="Seller mt-6 mx-4">
            <Seller
              name="إسم البائع"
              phoneNumber="+0201009449472"
              image="/cars/02.webp"
              rating={3}
            />
          </div>

          <div className="item_details py-6 ">
            <h1 className="text-slate-700 font-bold text-2xl">
              1990شراء مجموعة من السيارات من موديلات
            </h1>
            <p className="text-slate-500">code : 1254</p>
          </div>
          <div className="add_ w-full md:flex space-y-4 md:space-y-0 justify-between ">

            <div className="numbers flex gap-6">
              <span className="bg-pink/10  text-pink inline-flex items-center justify-center py-2 px-6">
                +10000
              </span>
              <span className="bg-pink/10  text-pink inline-flex items-center justify-center py-2 px-6">
                +12550
              </span>

              <span className="bg-pink/10  text-pink inline-flex items-center justify-center py-2 px-6">
                +11000
              </span>
            </div>

            <div className="input">
              <input type="text" placeholder="اكتب المبلغ"  className="  rounded-lg border border-gray-300 py-2 px-4 "/>
              <button className=" ms-2 bg-gradient-to-r from-pink to-dark_pink  py-2 px-8  rounded-lg font-bold text-white">
                تأكيد
              </button>
            </div>
          </div>
        </ClientOnly>
      </div>
      <div className="sidebar flex-1 bg-white drop-shadow-md rounded-lg p-4">
        sidebar
      </div>
    </div>
  );
}

export default page;
