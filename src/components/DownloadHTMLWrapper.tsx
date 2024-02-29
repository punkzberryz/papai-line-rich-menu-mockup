"use client";
import { toPng } from "html-to-image";
import React, { ReactNode, useRef } from "react";
import { Button } from "./ui/button";

const DownloadHTMLWrapper = ({ children }: { children: ReactNode }) => {
  const richMenuRef = useRef<HTMLDivElement>(null);
  const handleOnClick = () => {
    if (richMenuRef.current === null) return;
    toPng(richMenuRef.current, {
      quality: 1,
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
    <div className="grid gap-6">
      <div ref={richMenuRef} className="bg-white w-fit p-1">
        {children}
      </div>
      <Button className="" onClick={handleOnClick}>
        Download image
      </Button>
    </div>
  );
};

export default DownloadHTMLWrapper;
