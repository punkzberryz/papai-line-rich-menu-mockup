import Image from "next/image";
import GlowingCard from "../GlowingCard";
import { Card, CardContent } from "../ui/card";
import { DocumentIcon, NurseIcon, PapaiLogo } from "../Icon";

const MainPage = () => {
  return (
    <Card className="h-full rounded-xl">
      <CardContent className="p-3 h-full">
        <div className="flex flex-col h-full">
          <div className="relative h-1/2 p-2">
            <div className="text-center bg-gradient-to-r from-primary from-10% via-sky-500 via-50% to-primary-papai to-90% text-transparent bg-clip-text space-y-4">
              <h1 className="text-4xl font-semibold tracking-wide text-left ">
                ศูนย์รวมบุคลากรทางการแพทย์
              </h1>
              <h2 className="text-3xl text-left">ดูแล สะดวก เชื่อถือได้</h2>
              <p className="text-2xl text-left">มีที่พร้อมดูแล 24 ชั่วโมง</p>
              <div className="absolute text-black z-10 bottom-0 right-0">
                <GlowingCard className="mb-6" hover={true}>
                  <p className="text-sm font-light p-1">papaiplatform.com</p>
                </GlowingCard>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 grow text-2xl">
            <GlowingCard className="relative min-w-full" hover={false}>
              <NurseIcon className="-scale-x-[1]" />
              <p className="text-gray-600 text-2xl font-semibold tracking-wider">
                สมัครร่วมทีม
              </p>
            </GlowingCard>
            <GlowingCard className="relative min-w-full" hover={false}>
              <PapaiLogo className="-scale-x-[1]" />
              <p className="text-gray-600 text-2xl font-semibold tracking-wider">
                สมัครป้อนงาน
              </p>
            </GlowingCard>
            <GlowingCard className="relative min-w-full" hover={false}>
              <DocumentIcon className="-scale-x-[1]" />
              <p className="text-gray-600 text-2xl font-semibold tracking-wider">
                ป้อนงาน
              </p>
            </GlowingCard>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MainPage;
