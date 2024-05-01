import { ReactNode } from "react";
import {
  CalendarBookedIcon,
  CalendarConfirmedIcon,
  DocumentIcon,
  PapaiLogo,
} from "../Icon";

const CarerPage = () => {
  return (
    <div className="relative h-full bg-[url('/img/rich-menu/nurse-equipment.jpg')] bg-no-repeat bg-cover bg-center  rounded-lg">
      <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-lg overflow-hidden bg-fixed bg-gray-500 opacity-25"></div>
      <div className="h-full grid grid-cols-3 justify-center items-center">
        <CustomGlowingCard>
          <DocumentIcon />
          <p className="text-gray-600 text-2xl font-semibold tracking-wider">
            บอร์ดงาน
          </p>
        </CustomGlowingCard>
        <CustomGlowingCard>
          <CalendarConfirmedIcon />
          <p className="text-gray-600 text-2xl font-semibold tracking-wider">
            งานของฉัน
          </p>
        </CustomGlowingCard>
        <CustomGlowingCard>
          <CalendarBookedIcon />
          <p className="text-gray-600 text-2xl font-semibold tracking-wider">
            งานที่ฉันจอง
          </p>
        </CustomGlowingCard>
        <CustomGlowingCard>
          <PapaiLogo className="-scale-x-[1]" />
          <p className="text-gray-600 text-2xl font-semibold tracking-wider">
            หน้าของฉัน
          </p>
        </CustomGlowingCard>
      </div>
    </div>
  );
};

export default CarerPage;

const CustomGlowingCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative group cursor-pointer h-40 w-40 mx-auto">
      <div
        className={
          "absolute -inset-1 bg-gradient-to-b from-blue-400 to-primary-papai rounded-lg blur opacity-100 brightness-125"
        }
      ></div>
      <div className="relative h-full p-2 bg-white ring-1 ring-gray-900/5 rounded-lg flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};
