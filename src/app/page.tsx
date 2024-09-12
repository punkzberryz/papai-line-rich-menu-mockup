import DownloadHTMLWrapper from "@/components/DownloadHTMLWrapper";
import { Mainpage } from "@/components/rich-menu-builder/main-page";
import RichMenu from "@/components/rich-menu-builder/old/rich-menu";

export default function Home() {
  return (
    <section className="h-full flex flex-col items-center gap-y-10">
      <h1 className="text-xl py-6 font-semibold">LINE RichMenu Mockup</h1>
      <DownloadHTMLWrapper>
        {/* <RichMenu /> */}
        <Mainpage />
      </DownloadHTMLWrapper>
    </section>
  );
}
