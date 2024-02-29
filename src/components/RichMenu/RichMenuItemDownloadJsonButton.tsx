"use client";
import { RichMenuReturnType } from "@/lib/rich-menu-api";
import { Button } from "../ui/button";
import { useEffect } from "react";

interface RichMenuItemDownloadJsonButtonProps {
  richmenu: RichMenuReturnType;
}

const RichMenuItemDownloadJsonButton = ({
  richmenu,
}: RichMenuItemDownloadJsonButtonProps) => {
  return (
    <Button className="w-full" onClick={() => convertRichmenuToLink(richmenu)}>
      Download json body
    </Button>
  );
};

export default RichMenuItemDownloadJsonButton;

const convertRichmenuToLink = (richmenu: RichMenuReturnType) => {
  const fileName = richmenu.name.toLowerCase();
  const json = JSON.stringify(richmenu, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const href = URL.createObjectURL(blob);

  //create a link
  const link = document.createElement("a");
  link.href = href;
  link.download = `${fileName}.json`;
  link.click();
  URL.revokeObjectURL(href);
};
