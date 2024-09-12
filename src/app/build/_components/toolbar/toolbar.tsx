import { Button } from "@/components/ui/button";
import { ActiveElement } from "../types";
import { ShapesMenu } from "./shape-menu";
import Image from "next/image";
interface ToolbarProps {
  activeElement: ActiveElement;
  handleActiveElement: (element: ActiveElement) => void;
  imageInputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Toolbar = ({
  activeElement,
  handleActiveElement,
  handleImageUpload,
  imageInputRef,
}: ToolbarProps) => {
  const isActive = (value: string | Array<ActiveElement>) =>
    (activeElement && activeElement.value === value) ||
    (Array.isArray(value) &&
      value.some((val) => val?.value === activeElement?.value));
  return (
    <ul className="flex">
      {navElements.map((item) => (
        <li key={item.name}>
          {Array.isArray(item.value) ? (
            <ShapesMenu
              item={item as any}
              activeElement={activeElement}
              handleActiveElement={handleActiveElement}
              imageInputRef={imageInputRef}
              handleImageUpload={handleImageUpload}
            />
          ) : (
            <Button className="relative h-5 w-5 object-contain">
              <Image
                src={item.icon}
                alt={item.name}
                fill
                className={isActive(item.value) ? "invert" : ""}
              />
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
};

const shapeElements = [
  {
    icon: "/assets/rectangle.svg",
    name: "Rectangle",
    value: "rectangle",
  },
  {
    icon: "/assets/circle.svg",
    name: "Circle",
    value: "circle",
  },
  {
    icon: "/assets/triangle.svg",
    name: "Triangle",
    value: "triangle",
  },
  {
    icon: "/assets/line.svg",
    name: "Line",
    value: "line",
  },
  {
    icon: "/assets/image.svg",
    name: "Image",
    value: "image",
  },
  {
    icon: "/assets/freeform.svg",
    name: "Free Drawing",
    value: "freeform",
  },
];
const navElements = [
  {
    icon: "/assets/select.svg",
    name: "Select",
    value: "select",
  },
  {
    icon: "/assets/rectangle.svg",
    name: "Rectangle",
    value: shapeElements,
  },
  {
    icon: "/assets/text.svg",
    value: "text",
    name: "Text",
  },
  {
    icon: "/assets/delete.svg",
    value: "delete",
    name: "Delete",
  },
  {
    icon: "/assets/reset.svg",
    value: "reset",
    name: "Reset",
  },
];
