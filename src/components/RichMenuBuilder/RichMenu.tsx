import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainPage from "./MainPage";
import CarerPage from "./CarerPage";
import FeederPage from "./FeederPage";
const RichMenu = () => {
  return (
    <div className="bg-white w-[625px] h-[421px] rounded-xl">
      <Tabs defaultValue="home">
        <TabsList className="rounded-xl h-auto">
          <TabsTrigger
            value="home"
            className="rounded-xl text-xl data-[state=active]:ring data-[state=active]:ring-primary-papai"
          >
            หน้าหลัก
          </TabsTrigger>
          <TabsTrigger
            value="carer"
            className="rounded-xl text-xl  data-[state=active]:ring data-[state=active]:ring-primary-papai"
          >
            ผู้ดูแล
          </TabsTrigger>
          <TabsTrigger
            value="feeder"
            className="rounded-xl text-xl  data-[state=active]:ring data-[state=active]:ring-primary-papai"
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
