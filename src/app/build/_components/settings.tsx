import { Input } from "@/components/ui/input";
import { Canvas, FabricObject } from "fabric";
import { MutableRefObject, useEffect, useState } from "react";

interface SettingsProps {
  // canvasRef: MutableRefObject<Canvas | null>;
  canvas: Canvas | null;
}
export const Settings = ({ canvas }: SettingsProps) => {
  const {
    selectedObject,
    width,
    handleWidthChange,
    color,
    diameter,
    height,
    handleHeightChange,
    handleColorChange,
    handleDiameterChange,
  } = useSettings(canvas);
  if (!canvas) return null;

  return (
    <div>
      hi
      {selectedObject && selectedObject.type === "rect" && (
        <>
          <Input onChange={handleWidthChange} value={width} />
          <Input onChange={handleHeightChange} value={height} />
        </>
      )}
    </div>
  );
};

const useSettings = (canvas: Canvas | null) => {
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(
    null
  );
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [diameter, setDiameter] = useState("");
  const [color, setColor] = useState("");
  useEffect(() => {
    if (!canvas) return;
    canvas.on("selection:created", (event) => {
      console.log("selection:created");
      handleObjectSelection(event.selected[0]);
    });
    canvas.on("selection:updated", (event) => {
      console.log("selection:updated");
      handleObjectSelection(event.selected[0]);
    });
    canvas.on("selection:cleared", () => {
      console.log("selection:cleared");
      setSelectedObject(null);
      clearSettings();
    });
    canvas.on("object:modified", (event) => {
      console.log("object:modified");
      handleObjectSelection(event.target);
    });
    canvas.on("object:scaling", (event) => {
      console.log("object:scaling");
      handleObjectSelection(event.target);
    });
  }, [canvas]);

  const handleObjectSelection = (object: FabricObject) => {
    if (!object) return;
    setSelectedObject(object);
    console.log({ object });
    if (object.type === "rect") {
      setWidth(Math.round(object.width * object.scaleX).toString());
      setHeight(Math.round(object.height * object.scaleY).toString());
      setColor(object.fill as string);
      setDiameter("");
    } else if (object.type === "circle") {
      const radious = object.get("radius");
      setDiameter(Math.round(radious * 2 * object.scaleX).toString());
      setColor(object.fill as string);
      setWidth("");
      setHeight("");
    }
  };
  const clearSettings = () => {
    setWidth("");
    setHeight("");
    setDiameter("");
    setColor("");
  };
  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {};
  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {};
  const handleDiameterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {};
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  return {
    selectedObject,
    width,
    height,
    diameter,
    color,
    handleWidthChange,
    handleHeightChange,
    handleColorChange,
    handleDiameterChange,
  };
};
