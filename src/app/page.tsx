import DownloadHTMLWrapper from "@/components/DownloadHTMLWrapper";
import RichMenu from "@/components/RichMenuBuilder/RichMenu";

export default function Home() {
  return (
    <section className="h-full flex flex-col items-center gap-y-10">
      <h1 className="text-xl py-6 font-semibold">LINE RichMenu Mockup</h1>
      <DownloadHTMLWrapper>
        <RichMenu />
      </DownloadHTMLWrapper>
    </section>
  );
}
