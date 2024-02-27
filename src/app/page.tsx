"use client";
import RichMenu from "@/components/RichMenu";
import { Button } from "@/components/ui/button";
import { toJpeg, toPng } from "html-to-image";
import { useRef } from "react";
export default function Home() {
  const richMenuRef = useRef<HTMLDivElement>(null);
  const handleOnClick = () => {
    if (richMenuRef.current === null) return;
    toPng(richMenuRef.current, {
      quality: 0.9,
    })
      .then((dataUrl) => {
        console.log("dataUrl", dataUrl);
        const link = document.createElement("a");
        link.download = "rich-menu.jpeg";
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error);
      });
  };
  return (
    <main className="h-full flex flex-col items-center gap-y-40">
      <h1 className="text-xl py-6 font-semibold">LINE RichMenu Mockup</h1>
      <div ref={richMenuRef} className="bg-white w-fit scale-150">
        <div className="w-fit p-1 ">
          <RichMenu />
        </div>
      </div>
      <Button className="max-w-[450px] m-4" onClick={handleOnClick}>
        Download image
      </Button>
      {/* <Button3D /> */}
    </main>
  );
}
