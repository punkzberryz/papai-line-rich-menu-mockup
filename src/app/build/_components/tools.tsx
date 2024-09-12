"use client";
import { Button } from "@/components/ui/button";
import { Canvas, Circle, Rect } from "fabric";

interface ToolsProps {
  canvas: Canvas | null;
}
export const Tools = ({ canvas }: ToolsProps) => {
  const addRectangle = () => {
    if (!canvas) return;
    const rect = new Rect({
      left: 100,
      top: 100,
      fill: "red",
      width: 20,
      height: 20,
    });
    canvas.add(rect);
  };
  const addCircle = () => {
    if (!canvas) return;
    const circle = new Circle({
      left: 100,
      top: 100,
      fill: "blue",
      radius: 10,
    });
    canvas.add(circle);
  };
  return (
    <div>
      <Button onClick={addRectangle}>Add Rectangle</Button>
      <Button onClick={addCircle}>Add Circle</Button>
    </div>
  );
};
