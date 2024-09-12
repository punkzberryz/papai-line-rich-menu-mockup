import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainPage from "./main-page";
import CarerPage from "./carer-page";
import FeederPage from "./feeder-page";
const RichMenu = () => {
  return (
    <div className="bg-white w-[625px] h-[421px] rounded-xl">
      <Tabs defaultValue="home">
        <TabsList className="rounded-xl h-auto flex">
          <TabsTrigger
            value="home"
            className="w-1/3 rounded-xl text-xl data-[state=active]:ring data-[state=active]:ring-primary-papai"
          >
            หน้าหลัก
          </TabsTrigger>
          <TabsTrigger
            value="carer"
            className="w-1/3 rounded-xl text-xl  data-[state=active]:ring data-[state=active]:ring-primary-papai"
          >
            ผู้ดูแล
          </TabsTrigger>
          <TabsTrigger
            value="feeder"
            className="w-1/3 rounded-xl text-xl  data-[state=active]:ring data-[state=active]:ring-primary-papai"
          >
            ผู้ป้อนงาน
          </TabsTrigger>
        </TabsList>
        <TabsContent value="home" className="h-[365px] ">
          <MainPage />
        </TabsContent>
        <TabsContent value="carer" className="h-[365px] rounded-b-xl">
          <CarerPage />
        </TabsContent>
        <TabsContent value="feeder" className="h-[365px] rounded-b-xl">
          <FeederPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RichMenu;
