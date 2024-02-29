import { ReactNode } from "react";
import { DocumentIcon, PapaiLogo } from "../Icon";

const FeederPage = () => {
  return (
    <div className="relative h-full bg-[url('/img/rich-menu/healthcare-reception.jpg')] bg-no-repeat bg-cover rounded-lg">
      <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-lg overflow-hidden bg-fixed bg-gray-500 opacity-40"></div>
      <div className="h-full flex justify-center items-center">
        <CustomGlowingCard>
          <DocumentIcon />
          <p className="text-gray-600 text-2xl font-semibold tracking-wider">
            ป้อนงาน
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

export default FeederPage;

const CustomGlowingCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative group cursor-pointer h-44 w-40 m-5">
      <div
        className={
          "absolute -inset-1 bg-gradient-to-b from-red-400 to-primary-papai rounded-lg blur opacity-100 brightness-125"
        }
      ></div>
      <div className="relative h-full p-2 bg-white ring-1 ring-gray-900/5 rounded-lg flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};
