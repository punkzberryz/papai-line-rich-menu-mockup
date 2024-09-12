import { Metadata } from "next";
import { CanvasApp } from "./_components/canvas-app";

const BuildRichMenuPage = () => {
  return (
    <div>
      <CanvasApp />
    </div>
  );
};

export default BuildRichMenuPage;

export const metadata: Metadata = { title: "Build Rich Menu" };
