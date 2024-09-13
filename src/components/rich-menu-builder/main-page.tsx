import GlowingCard from "../GlowingCard";
import { DocumentIcon, NurseIcon, PapaiLogo } from "../Icon";
import { Button } from "../ui/button";

export const Mainpage = () => {
  return (
    <div className="h-[421px] w-[625px] rounded-xl bg-primary/10">
      {/* Title */}
      <div className="relative h-1/3 w-full">
        {/* Hero message */}
        <div className="mx-auto w-fit space-y-2 bg-gradient-to-r from-primary from-10% via-sky-500 via-50% to-primary-papai to-90% bg-clip-text p-4 pt-6 text-center text-transparent">
          <h1 className="text-left text-4xl font-semibold tracking-wide">
            ช่วยคุณค้นหาผู้ดูแล
          </h1>
          <h2 className="text-left text-3xl">
            สะดวก ปลอดภัย ด้วยราคาที่คุณกำหนด
          </h2>
        </div>
        {/* Buttons */}
        <div className="absolute right-2 top-1.5 flex space-x-4">
          <Button className="rounded-xl" variant="outline">
            <p className="p-1 text-sm font-light">Papai Platform</p>
          </Button>
        </div>
      </div>
      {/* Buttons */}
      <div className="h-2/3 w-full">
        <div className="grid h-full grow grid-cols-3 gap-4 p-2.5 text-2xl">
          <GlowingCard className="relative min-w-full" hover={false}>
            <div className="flex h-full flex-col items-center">
              <div className="h-2/3 pt-10">
                <NurseIcon className="-scale-x-[1]" />
              </div>
              <p className="text-center text-2xl font-semibold tracking-wider text-gray-600">
                หาผู้ดูแล
              </p>
            </div>
          </GlowingCard>
          <GlowingCard className="relative min-w-full" hover={false}>
            <div className="flex h-full flex-col items-center">
              <div className="h-2/3 pt-10">
                <DocumentIcon className="-scale-x-[1]" />
              </div>
              <p className="text-center text-2xl font-semibold tracking-wider text-gray-600">
                งานที่ฉันประกาศ
              </p>
            </div>
          </GlowingCard>
          <GlowingCard className="relative min-w-full" hover={false}>
            <div className="flex h-full flex-col items-center">
              <div className="h-2/3 pt-10">
                <PapaiLogo className="-scale-x-[1]" />
              </div>
              <p className="text-center text-2xl font-semibold tracking-wider text-gray-600">
                สมัครใหม่
                {/* <span className="text-3xl text-primary">พาไป</span> */}
              </p>
            </div>
          </GlowingCard>
        </div>
      </div>
    </div>
  );
};
